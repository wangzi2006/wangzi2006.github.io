#!/usr/bin/env node
/**
 * 批量替换图片格式脚本
 * 将 <div align="center"><img src="..." style="height: XXvh"></div>
 * 转换为 <img src="..." class="img-portrait"> 或 <img src="..." class="img-landscape">
 *
 * 用法：
 *   node ./convert_image.js --dry-run
 *   node ./convert_image.js --write
 *   node ./convert_image.js --content ./content --write
 */

import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { globby } from "globby"

function parseArgs(argv) {
    const args = {
        contentDir: "./content",
        dryRun: true,
        help: false,
    }

    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === "--help" || a === "-h") {
            args.help = true
        } else if (a === "--write") {
            args.dryRun = false
        } else if (a === "--dry-run") {
            args.dryRun = true
        } else if (a === "--content") {
            const v = argv[i + 1]
            if (!v) throw new Error("Missing value for --content")
            args.contentDir = v
            i++
        } else {
            throw new Error(`Unknown argument: ${a}`)
        }
    }

    return args
}

function printHelp() {
    console.log("Usage:")
    console.log("  node ./convert_image.js --dry-run")
    console.log("  node ./convert_image.js --write")
    console.log("  node ./convert_image.js --content ./content --write")
    console.log("")
    console.log("Options:")
    console.log("  --content <dir>   Content directory (default: ./content)")
    console.log("  --dry-run         Preview only (default)")
    console.log("  --write           Write changes to files")
    console.log("  -h, --help        Show help")
}

/**
 * 判断是横图还是竖图
 * @param {string} style - style 属性字符串
 * @returns {'landscape' | 'portrait'}
 */
function getOrientation(style) {
    const heightMatch = style.match(/height:\s*(\d+)vh/i)
    if (!heightMatch) return "portrait"

    const heightValue = Number.parseInt(heightMatch[1], 10)
    return heightValue >= 60 ? "portrait" : "landscape"
}

function getAttr(tag, name) {
    const re = new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i")
    return tag.match(re)?.[1]
}

function escapeHtmlAttr(value) {
    return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
}

/**
 * 转换单个文件的内容
 * @param {string} content - 原始内容
 * @returns {{ newContent: string, changed: boolean, changes: Array<{original: string, replacement: string, orientation: string}> }}
 */
function transformContent(content) {
    let changed = false
    const changes = []

    // 匹配：<div align=center> ... <img ...> ... </div>
    // 为了兼容属性顺序不同/自闭合 <img />，这里先匹配整个 div+img，再在回调里解析 src/style/alt
    const regex =
        /<div\s+align\s*=\s*(?:"center"|'center'|center)\s*>\s*(<img\b[^>]*\/?>)\s*<\/div>/gi

    const newContent = content.replace(regex, (match, imgTag) => {
        const src = getAttr(imgTag, "src")
        const style = getAttr(imgTag, "style")
        const alt = getAttr(imgTag, "alt")

        if (!src || !style) return match

        changed = true

        const orientation = getOrientation(style)
        const className = orientation === "portrait" ? "img-portrait" : "img-landscape"

        const altPart = alt ? ` alt="${escapeHtmlAttr(alt)}"` : ""
        const replacement = `<img src="${src}" class="${className}"${altPart}>`

        changes.push({
            original: match.length > 120 ? match.substring(0, 120) + "..." : match,
            replacement,
            orientation,
        })

        return replacement
    })

    return { newContent, changed, changes }
}

/**
 * 处理单个文件
 * @param {string} filePath - 文件路径
 * @param {{dryRun: boolean}} opts
 */
async function processFile(filePath, opts) {
    try {
        const content = fs.readFileSync(filePath, "utf-8")
        const { newContent, changed, changes } = transformContent(content)

        if (!changed) {
            return { filePath, changed: false }
        }

        console.log(`\n📄 ${filePath}`)
        changes.forEach((change, index) => {
            console.log(`  ${index + 1}. 类型: ${change.orientation}`)
            console.log(`     原始: ${change.original}`)
            console.log(`     替换: ${change.replacement}`)
        })

        if (!opts.dryRun) {
            fs.writeFileSync(filePath, newContent, "utf-8")
            console.log("  ✅ 已写入文件")
        }

        return { filePath, changed: true, changeCount: changes.length }
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error)
        return { filePath, changed: false, error }
    }
}

/**
 * 主函数
 */
async function main() {
    const opts = parseArgs(process.argv.slice(2))
    if (opts.help) {
        printHelp()
        return
    }

    console.log("🔍 开始扫描 Markdown 文件...")
    console.log(`📁 内容目录: ${path.resolve(opts.contentDir)}`)
    console.log(`🧪 预览模式: ${opts.dryRun ? "ON（不会实际修改文件）" : "OFF（将会写入文件）"}`)
    console.log("─".repeat(60))

    const contentDirAbs = path.resolve(opts.contentDir)

    // 查找所有 .md 文件
    const files = await globby(["**/*.md"], {
        cwd: contentDirAbs,
        gitignore: true,
        absolute: true,
    })

    console.log(`📚 找到 ${files.length} 个 Markdown 文件\n`)
    if (files.length === 0) {
        console.log("⚠️ 没有找到任何 Markdown 文件，请检查 --content 配置")
        return
    }

    // 处理所有文件
    const results = []
    for (const file of files) {
        const result = await processFile(file, { dryRun: opts.dryRun })
        results.push(result)
    }

    // 统计结果
    const changedFiles = results.filter((r) => r.changed)
    const totalChanges = changedFiles.reduce((sum, r) => sum + (r.changeCount || 0), 0)

    console.log("\n" + "─".repeat(60))
    console.log("📊 统计结果:")
    console.log(`   总文件数: ${files.length}`)
    console.log(`   修改文件数: ${changedFiles.length}`)
    console.log(`   总替换次数: ${totalChanges}`)

    if (opts.dryRun && changedFiles.length > 0) {
        console.log("\n💡 提示: 当前为预览模式。如需实际修改，请使用 --write")
    }

    if (changedFiles.length > 0) {
        console.log("\n📋 被修改的文件列表:")
        changedFiles.forEach((f) => {
            console.log(`   - ${path.relative(process.cwd(), f.filePath)} (${f.changeCount} 处)`)
        })
    }
}

main().catch((err) => {
    console.error(err)
    process.exitCode = 1
})