import { useForm } from "react-hook-form";

const SubmitModal = ({ close }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Task Submitted:", data);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Submit Your Task</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("submission", { required: true })}
            placeholder="Paste your Google Drive / GitHub link here"
            className="w-full h-32 border p-3 rounded mb-4"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitModal;
