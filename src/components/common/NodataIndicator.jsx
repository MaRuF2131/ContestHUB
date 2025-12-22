import React from "react";
import { Database } from "lucide-react";

function NoDataIndicator({ message = "No data found" }) {
  return (
    <div className="w-full flex justify-center mt-10">
      <div
        className="flex flex-col items-center gap-4
        px-8 py-6 rounded-2xl
        bg-zinc-100 dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-700
        shadow-sm"
      >
        {/* Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full
          bg-gradient-to-r from-pink-500 to-purple-500
          text-white shadow-lg animate-bounce">
          <Database className="w-8 h-8" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Nothing to show
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoDataIndicator;
