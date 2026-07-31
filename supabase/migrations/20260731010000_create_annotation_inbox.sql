create or replace view public.annotation_inbox
with (security_invoker = true)
as
select
  annotations.created_at at time zone 'Asia/Shanghai' as "日期",
  annotations.page_title as "文档",
  annotations.quote as "引用内容",
  annotations.comment as "评论",
  coalesce(nullif(btrim(annotations.display_name), ''), '匿名') as "署名"
from public.annotations
order by annotations.created_at desc;

revoke all on table public.annotation_inbox from public, anon, authenticated;
grant select on table public.annotation_inbox to service_role;

comment on view public.annotation_inbox is
  'Owner-only compact inbox for reviewing website annotations in the Supabase dashboard.';
