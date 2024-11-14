import { Models } from "appwrite";

import { formatTime } from "../lib/utils";

interface ColorClassProps {
  box: string;
  header: string;
}

const Message = ({
  chat,
  colorClass,
}: {
  chat: Models.Document;
  colorClass?: ColorClassProps;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 max-w-60 sm:max-w-96 rounded-[4rem] sm:rounded-full px-8 py-4 sm:py-2 ${colorClass?.box}`}
    >
      <h1
        className={`w-fit font-bold text-xl border-b-1 ${colorClass?.header}`}
      >
        {chat.name}
      </h1>
      <p className="break-words font-semibold">{chat.message}</p>
      <div className="text-[8px] sm:text-[10px] text-right text-slate-600/80 dark:text-purple-400/80 italic">
        {formatTime(chat.$createdAt)}
      </div>
    </div>
  );
};

export default Message;
