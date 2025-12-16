import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import toast from "react-hot-toast";

const demoContest = {
  id: 1,
  name: "Logo Design Challenge",
  image: "https://via.placeholder.com/150",
  description: "Create a logo for a new startup",
  price: 50,
  prizeMoney: 200,
  taskInstruction: "Submit a vector file",
  type: "Design",
  deadline: new Date(),
};

const EditContest = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: demoContest,
  });

  const [deadline, setDeadline] = useState(new Date(demoContest.deadline));

  const onSubmit = (data) => {
    const updatedContest = { ...data, deadline };
    console.log("Updated Contest:", updatedContest);
    toast.success("Contest updated successfully 🎉");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Edit Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="label">Contest Name</label>
          <input type="text" {...register("name", { required: true })} className="input" />
          {errors.name && <p className="error">Name is required</p>}
        </div>

        <div>
          <label className="label">Image URL</label>
          <input type="text" {...register("image", { required: true })} className="input" />
        </div>

        <div>
          <label className="label">Price ($)</label>
          <input type="number" {...register("price", { required: true })} className="input" />
        </div>

        <div>
          <label className="label">Prize Money ($)</label>
          <input type="number" {...register("prizeMoney", { required: true })} className="input" />
        </div>

        <div>
          <label className="label">Contest Type</label>
          <select {...register("type", { required: true })} className="input">
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Content Writing">Content Writing</option>
          </select>
        </div>

        <div>
          <label className="label">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input w-full"
            minDate={new Date()}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea rows="3" {...register("description", { required: true })} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="label">Task Instruction</label>
          <textarea rows="3" {...register("taskInstruction", { required: true })} className="input" />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            Update Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContest;
