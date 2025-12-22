import React from "react";
import {
  Calendar,
  DollarSign,
  Trophy,
  User,
  Mail,
  Users,
  Tag,
  Clock,
  Award,
} from "lucide-react";

import Badge from "./Badge"
import Info from "./InfoCard"
import CreatorCard from "./CreatorCard"

const ContestDetailsView = ({ contest }) => {
  if (!contest) return null;

  const {
    name,
    price,
    prizeMoney,
    type,
    description,
    taskInstruction,
    deadline,
    creator,
    creatorEmail,
    winnerID,
    imageUrl,
    createdAt,
    status,
    participants,
  } = contest;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-6 space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden border bg-zinc-100 dark:bg-zinc-800">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[320px] object-cover"
          />
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {name}
          </h1>

          <div className="flex flex-wrap gap-2">
            <Badge icon={<Tag size={14} />} text={type} />
            <Badge icon={<Clock size={14} />} text={status} />
            <Badge
              icon={<Users size={14} />}
              text={`${participants} Participants`}
            />
          </div>

          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Info icon={<DollarSign />} label="Entry Fee" value={`৳ ${price}`} />
            <Info icon={<Trophy />} label="Prize Money" value={`৳ ${prizeMoney}`} />
            <Info
              icon={<Calendar />}
              label="Deadline"
              value={new Date(deadline).toLocaleDateString()}
            />
            <Info
              icon={<Clock />}
              label="Created At"
              value={new Date(createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      {/* Creator Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CreatorCard
          icon={<User />}
          label="Creator"
          value={creator}
        />
        <CreatorCard
          icon={<Mail />}
          label="Creator Email"
          value={creatorEmail}
        />
      </div>

      {/* Task Instruction */}
      <section className="border rounded-xl p-6 bg-zinc-50 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
          📋 Task Instruction
        </h2>
        <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
          {taskInstruction}
        </p>
      </section>

      {/* Winner Section */}
      <section className="border rounded-xl p-6 bg-white dark:bg-zinc-950">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-zinc-900 dark:text-white">
          <Award className="text-yellow-500" /> Winner
        </h2>

        {winnerID ? (
          <p className="text-green-600 font-medium">
            Winner Selected: {winnerID}
          </p>
        ) : (
          <p className="text-zinc-500 italic">
            Winner not selected yet
          </p>
        )}
      </section>
    </div>
  );
};

export default ContestDetailsView;
