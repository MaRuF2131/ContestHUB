
function TableLoader({ms}) {
  return (
    <div className="mt-4 flex justify-center w-full">
        <div className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-full
          bg-zinc-100 dark:bg-zinc-800
          text-zinc-600 dark:text-zinc-300
          text-sm font-medium animate-pulse">
          {`⏳ Loading ${ms}...`}
        </div>
      </div>
  )
}

export default TableLoader