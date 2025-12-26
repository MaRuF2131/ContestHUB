import React from "react";
import { useForm } from "react-hook-form";

const MyProfile = ({ user, stats }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      bio: user?.bio || "",
    },
  });

  const winPercentage =
    stats?.participated > 0
      ? Math.round((stats?.won / stats?.participated) * 100)
      :0;

  const onSubmit = (data) => {
    console.log("Updated profile:", data);
  };

  return (
    <div className="space-y-8">
      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Your name"
            className="w-full p-3 rounded-xl border"
          />

          <textarea
            {...register("bio")}
            placeholder="Bio / Address"
            className="w-full p-3 rounded-xl border"
          />

          <button
            type="submit"
            className=" cursor-pointer px-6 py-2 rounded-xl
            bg-gradient-to-r from-pink-500 to-purple-500
            text-white font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* WIN RATE */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-3 text-black dark:text-white">📈 Win Percentage</h3>

        <div className="w-full h-4 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            style={{ width: `${winPercentage}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          {winPercentage}% wins ({stats?.won} / {stats?.participated})
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
