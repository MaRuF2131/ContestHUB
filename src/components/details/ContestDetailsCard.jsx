import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import contestData from "../../../demoData/contestsData.json";
import { motion } from "framer-motion";
import SubmitModal from "./SubmitModal";

const ContestDetails = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState("");
  const [registered, setRegistered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contest, setContest] = useState(null);

  useEffect(()=>{
    const c = contestData.find((c) => c.id === id);
    setContest(c);
  },[id])


  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const deadline = new Date(contest.deadline);
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

    if (!contest) {
    return <div className="text-center mt-20">Contest not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">

      {/* Banner */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={contest.image}
        className="w-full h-96 object-cover rounded-2xl shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mt-8">{contest.name}</h1>

      {/* Participants */}
      <p className="text-blue-600 font-semibold mt-2">
        👥 {contest.participants} Participants
      </p>

      {/* Countdown */}
      <p className="mt-3 text-lg font-semibold text-red-500">
        ⏳ {timeLeft}
      </p>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Contest Description</h2>
        <p className="text-gray-700">{contest.shortDesc}</p>
      </div>

      {/* Task */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Task Instruction</h2>
        <p className="text-gray-700">{contest.task}</p>
      </div>

      {/* Prize */}
      <div className="mt-6 text-xl font-bold text-green-600">
        🏆 Prize Money: {contest.prize}
      </div>

      {/* Winner (Conditional) */}
      {contest.winner && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl flex items-center gap-5">
          <img
            src={contest.winner.photo}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">
              Winner: {contest.winner.name}
            </h3>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          disabled={timeLeft === "Contest Ended"}
          onClick={() => setRegistered(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
        >
          Register / Pay
        </button>

        {registered && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Submit Task
          </button>
        )}
      </div>

      {/* Submit Modal */}
      {openModal && (
        <SubmitModal close={() => setOpenModal(false)} />
      )}

    </div>
  );
};

export default ContestDetails;
