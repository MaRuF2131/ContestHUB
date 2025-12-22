import { useLocation, useNavigate } from "react-router-dom";

const MessageRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title=location?.state?.message || 'Admin/Creator'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-2">This page Only for {title}</h1>
      <p className="text-xl text-gray-700 mb-3">You can not access this.</p>

      <img
        src="https://i.imgur.com/qIufhof.png" // You can use any image or gif URL
        alt="404 Not Found"
        className="w-52 max-w-full mb-3"
      />

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ⬅ Go Home
      </button>
    </div>
  );
};

export default MessageRoute;
