import { motion } from "framer-motion";
import { useForm } from "react-hook-form";


export default function Banner({ onSearch }) {
const { register, handleSubmit } = useForm(
    {
        shouldUnregister:true,
    }
);


const submit = (data) => onSearch(data.query);


return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7 }}
className="h-[380px] mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex flex-col justify-center items-center text-white"
>
<h1 className="text-4xl font-bold mb-4">Discover Amazing Contests</h1>
<p className="opacity-90 mb-6">Find the best contests & show your creativity!</p>


<form onSubmit={handleSubmit(submit)} className="w-full max-w-md">
<input
{...register("query")}
className="w-full p-3 border-1 outline-0 text-black rounded-lg"
placeholder="Search contest type..."
/>
</form>
</motion.div>
);
}