import { Bell,Search } from "lucide-react";
import ThemeToggle from "../../../utils/theme/Theme";

const Navbar = () => {
  return (
    <div className='inline-flex justify-between items-center w-full h-fit bg-[#504a54] dark:bg-black border-y-1 rounded-r-md border-blue-700 md:px-4 px-2 py-2 space-x-6'>
      <ThemeToggle></ThemeToggle>
      <div className="w-full flex items-center dark:text-white text-black">
        <input type="text" className=" w-full md:px-4 px-2 py-2 outline-1 outline-blue-700 rounded-md" />
        <div className="md:px-4 px-2 py-2 border-1 rounded-md border-blue-700 ">
          <Search className="w-6 h-6 font-bold text-blue-700" />
        </div>
      </div>

        <Bell className="w-8 h-8 font-bold text-blue-700" />
    </div>
  )
}

export default Navbar