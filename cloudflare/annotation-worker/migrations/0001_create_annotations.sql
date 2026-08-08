create table if not exists annotations (
  id text primary key,
  submission_id text not null unique,
  anonymous_session_id text not null,
  page_title text not null,
  page_url text not null,
  page_slug text not null,
  heading_text text,
  heading_level text,
  heading_id text,
  quote text not null,
  prefix text not null,
  suffix text not null,
  text_start integer not null,
  text_end integer not null,
  comment text not null,
  display_name text,
  client_sent_at text,
  client_time_zone text,
  email_status text not null default 'pending'
    check (email_status in ('pending', 'sent', 'failed')),
  notified_at text,
  created_at text not null
);

create index if not exists annotations_created_at_idx
  on annotations (created_at desc);

create view if not exists annotation_inbox as
select
  datetime(created_at, '+8 hours') as "日期",
  page_title as "文档",
  quote as "引用内容",
  comment as "评论",
  coalesce(nullif(trim(display_name), ''), '匿名') as "署名"
from annotations
order by created_at desc;
