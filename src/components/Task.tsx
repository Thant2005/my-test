import dayjs from "dayjs";
import relateiveTime from "dayjs/plugin/relativeTime";
import type { Task } from "../types/task";
import CheckBox from "./CheckBox";
import DeleteButton from "./DeleteButton";

export default function Task({ task }: { task: Task }) {
  dayjs.extend(relateiveTime);
  return (
    <div className="flex hover:bg-surface items-center gap-3 px-5 py-4">
      <CheckBox id={task.id} isCheck={task.is_completed} />
      <span
        className={`flex-1  ${task.is_completed === true ? "line-through text-muted" : "text-sm"}`}
      >
        {task.title}
      </span>
      <span className="hidden shrink-0 text-xs text-zinc-400 sm:block">
        {dayjs(task.created_at).fromNow()}
      </span>
      <DeleteButton id={task.id} />
    </div>
  );
}
