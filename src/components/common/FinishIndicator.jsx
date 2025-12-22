import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

function FinishIndicator({ms}) {
  return (
    <div className=" mt-10 w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
        <FaInfoCircle />
        <span className="font-medium">
           {ms}
        </span>
    </div>
  )
}

export default FinishIndicator