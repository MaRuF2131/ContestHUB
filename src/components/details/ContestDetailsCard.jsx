import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SubmitModal from "./SubmitModal";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utils/stripe";
import Pagination from "../../utils/Pagination";
import TextOrcardLoader from "../loader/TextOrcardLoader";
import NoDataIndicator from "../common/NodataIndicator";
import { Clock, Trophy, Users, DollarSign, Tag } from "lucide-react";
import axiosInstance from "../../utils/api/axios";
import toast from "react-hot-toast";
import ReactConfetti from "react-confetti";

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [paymentstatus,setpaymentStatus]=useState(false);
  const [payLoading,setpayLoading]=useState(true);

  const { data, isFetching } = Pagination({
    url: `/alluser/get/single/${id}`,
    keyValuepair: { status: "all" },
    page: 1,
    limit: 1,
  });
  const checkStatus=async(id)=>{
     try {
      setpayLoading(true)
      const {data}= await axiosInstance.get(`/api/payments/payment_status/${id}`);
      setpaymentStatus(data?.status);
      console.log("status",data);
     } catch (error) {
        console.log(error);
        setpaymentStatus("error");
        toast.error(error?.response?.data?.message || "Failed")
     }finally{
      setpayLoading(false)
     }

  }
  useEffect(() => {
    if (data) {
      const value = data?.pages?.flatMap((p) => p?.data?.data) || [];
      setContest(value[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!contest) return;
    if (contest?._id) {
      checkStatus(contest?._id)
    }
    const timer = setInterval(() => {
      const diff = new Date(contest.deadline) - new Date();
      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [contest]);

  if (!contest && !isFetching)
    return <NoDataIndicator message="Contest" />;

  return (
    <div className=" relative overflow-hidden min-h-screen bg-zinc-50 dark:bg-black pb-24">
             {/* Confetti for #1 */}
      {(!payLoading && paymentstatus==='succeeded') && <ReactConfetti recycle={false} numberOfPieces={250} />}
            {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      {/* HERO */}
      {(!isFetching && contest) && (
      <>  
      <div className="relative h-[460px] overflow-hidden ">

      {/* Background Image */}
      <img
        src={contest.imageUrl}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        alt={contest.name}
      />

      {/* Dark cinematic layer */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Pink–Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr 
        from-fuchsia-700/10 via-pink-600/10 to-violet-700/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold
            bg-clip-text text-transparent
            bg-gradient-to-r from-pink-200 via-fuchsia-300 to-violet-200
            drop-shadow-[0_4px_20px_rgba(236,72,153,0.6)]"
        >
          {contest.name}
        </motion.h1>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center gap-2 text-white/90 font-medium"
        >
          <Clock className="w-5 h-5 text-yellow-300" />
          {timeLeft}
        </motion.p>

        {/* Info Chips */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <Chip
            icon={<Trophy className="text-yellow-300" />}
            label={`$${contest.prizeMoney} Prize`}
          />

          <Chip
            icon={<DollarSign className="text-emerald-300" />}
            label={`Entry $${contest.price}`}
          />

          <Chip
            icon={<Users className="text-sky-300" />}
            label={`${contest.participants} Joined`}
          />

          <Chip
            icon={<Tag className="text-pink-300" />}
            label={contest.type}
          />

        </div>
      </div>
      </div>


      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 mt-16 space-y-10">
        {/* Description */}
        <Section title="Contest Description">
          {contest?.description}
        </Section>

        {/* Task */}
        <Section title="Task Instruction">
          {contest?.taskInstruction}
        </Section>

        {/* Creator */}
        <div className="rounded-3xl p-6
            bg-gradient-to-br from-white/80 to-fuchsia-50
            dark:from-zinc-900/80 dark:to-violet-900/30
            backdrop-blur
            border border-white/20
            shadow-lg">
          <p className="text-sm text-zinc-500">Created by</p>
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            {contest.creator}
          </h3>
          <p className="text-sm text-zinc-500">
            {contest.creatorEmail}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-4">
          { 
           (!payLoading && paymentstatus==='Please payment') && <button
              disabled={timeLeft === "Contest Ended"}
              onClick={() => setPayOpen(true)}
              className="cursor-pointer px-10 py-3.5 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-fuchsia-600 via-pink-500 to-violet-600
              shadow-lg shadow-pink-500/30
              hover:scale-105 hover:shadow-xl transition-all"
            >
              Join Contest – ${contest.price}
            </button>
          }
          { 
           (!payLoading && paymentstatus==='failed') && <button
              disabled={timeLeft === "Contest Ended"}
              onClick={() => setPayOpen(true)}
              className="cursor-pointer px-10 py-3.5 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-fuchsia-600 via-pink-500 to-violet-600
              shadow-lg shadow-pink-500/30
              hover:scale-105 hover:shadow-xl transition-all"
            >
              Join Contest – ${contest.price}
            </button>
          }

          {(!payLoading && paymentstatus==='succeeded') && (
            <button
              onClick={() => setOpenModal(true)}
              className="cursor-pointer px-10 py-3.5 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 to-teal-500
              shadow-lg shadow-emerald-500/30
              hover:scale-105 transition"
            >
              Submit Your Work
            </button>
          )}
          {(!payLoading && paymentstatus==='pending' || paymentstatus==='error') && (
            <button
              onClick={() =>checkStatus(contest?._id)}
              className="cursor-pointer px-10 py-3.5 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 to-teal-500
              shadow-lg shadow-emerald-500/30
              hover:scale-105 transition"
            >
              Refresh
            </button>
          )}
          {(payLoading) && (
            <div
              className="cursor-pointer px-10 py-3.5 rounded-2xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 to-teal-500
              shadow-lg shadow-emerald-500/30
              hover:scale-105 transition"
            >
              Checking Payment...
            </div>
          )}
        </div>
      </div>
      </>
      )}
      {/* Loader */}
      {isFetching && (
        <div className="mt-20 text-center">
          <TextOrcardLoader ms="Contest" />
        </div>
      )}

      {/* MODALS */}
      {payOpen && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            contest={contest}
            close={() => setPayOpen(false)}
            onSuccess={() => {
              setPayOpen(false);
              checkStatus(contest?._id)
            }}
          />
        </Elements>
      )}

      {openModal && <SubmitModal close={() => setOpenModal(false)} />}
    </div>
  );
};

export default ContestDetails;

/* ---------- UI Helpers ---------- */

const Section = ({ title, children }) => (
  <div className="rounded-3xl p-8
    bg-white/80 dark:bg-zinc-900/70
    backdrop-blur-xl
    border border-white/20
    shadow-xl shadow-fuchsia-500/10">
    
    <h2 className="text-xl font-bold mb-4
      bg-gradient-to-r from-fuchsia-600 to-violet-600
      bg-clip-text text-transparent">
      {title}
    </h2>

    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {children}
    </p>
  </div>
);


const Chip = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full
    bg-white/20 backdrop-blur-md
    border border-white/30
    shadow-lg shadow-pink-500/20
    text-white hover:scale-105 transition">
    {icon}
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

