import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/api/axios";
import { useState } from "react";

const CheckoutForm = ({ contest, close, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading,setloading]=useState(false)
  const handlePay = async (e) => {
    setloading(true);
    try{
        e.preventDefault();
        console.log("con",contest);
        const { data } = await axiosInstance.post("/api/payments/create-intent", {
          contestId: contest?._id,
        });

        if(!data?.clientSecret){
          return toast.error("Payment Request Fail");
        }

        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (result.error) {
          toast.error(result.error.message);
        } else {
          toast.success("Payment request successful 🎉");
          onSuccess();
          close();
        }
      }catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message || "Payment Request Fail");
      }finally{
        setloading(false)
      }
  };

  return (
    <div className="fixed z-[999] inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={handlePay}
        className="bg-white p-6 rounded-xl w-96"
      >
        <h2 className="text-xl font-bold mb-4">Pay ${contest?.price}</h2>

        <CardElement className="p-4 border rounded mb-4" />

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={close} className="px-4 py-2 cursor-pointer bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded">
            {loading?"Payning...":"Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
