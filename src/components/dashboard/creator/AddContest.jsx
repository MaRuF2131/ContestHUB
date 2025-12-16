import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddContest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [deadline, setDeadline] = useState(null);

  const onSubmit = (data) => {
    if (!deadline) {
      toast.error("Please select a deadline");
      return;
    }

    const contestData = {
      ...data,
      price: Number(data.price),
      prizeMoney: Number(data.prizeMoney),
      deadline,
      participants: 0,
      status: "active",
    };

    console.log("Contest Data:", contestData);
    toast.success("Contest Added Successfully 🎉");
    reset();
    setDeadline(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-800 dark:text-white">
        <PlusCircle className="w-6 h-6 text-pink-500" />
        Add New Contest
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Contest Name */}
        <div>
          <label className="label">Contest Name</label>
          <input
            type="text"
            {...register("name", { required: "Contest name is required" })}
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Contest Image */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image is required" })}
            className="input"
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Entry Price ($)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input"
          />
        </div>

        {/* Prize Money */}
        <div>
          <label className="label">Prize Money ($)</label>
          <input
            type="number"
            {...register("prizeMoney", { required: true })}
            className="input"
          />
        </div>

        {/* Contest Type */}
        <div>
          <label className="label">Contest Type</label>
          <select {...register("type", { required: true })} className="input">
            <option value="">Select Type</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Content Writing">Content Writing</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input w-full"
            placeholderText="Select deadline"
            minDate={new Date()}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            rows="4"
            {...register("description", { required: true })}
            className="input"
          />
        </div>

        {/* Task Instruction */}
        <div className="md:col-span-2">
          <label className="label">Task Instruction</label>
          <textarea
            rows="4"
            {...register("taskInstruction", { required: true })}
            className="input"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            Create Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
