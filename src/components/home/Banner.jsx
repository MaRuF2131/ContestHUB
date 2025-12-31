import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

export default function Banner({ onSearch }) {
  const { register, handleSubmit } = useForm({
    shouldUnregister: true,
  });

  const submit = (data) => onSearch(data.query);

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 max-w-full h-96 bg-pink-500/30  blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 max-w-full h-96 bg-purple-500/30  blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-[580px] max-h-screen
        bg-gradient-to-r from-pink-500 to-purple-600
         shadow-2xl
        flex flex-col justify-center items-center text-center px-6"
      >
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Discover Amazing Contests
        </h1>

        <p className="text-white/90 text-lg max-w-2xl mb-10">
          Explore creative challenges, compete globally, and win exciting rewards.
        </p>

        {/* Search Box */}
        <motion.form
          onSubmit={handleSubmit(submit)}
          whileFocusWithin={{
            scale: 1.03,
            boxShadow: "0 0 0 4px rgba(236,72,153,0.35)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full max-w-xl"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />

          <input
            {...register("query")}
            placeholder="Search contests by type, prize, or keyword..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl
            bg-white/90 backdrop-blur-xl
            text-zinc-900 placeholder-zinc-400
            outline-none border border-white/40
            shadow-lg"
          />
        </motion.form>
      </motion.div>
    </section>
  );
}
