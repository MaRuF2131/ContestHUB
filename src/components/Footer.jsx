import { Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Logo */}
        <h2 className="text-3xl font-bold mb-3">ContestHub</h2>

        <p className="text-gray-400 mb-5">
          © 2025 ContestHub — All Rights Reserved.
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Facebook size={25} />
          </a>

          <a
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Linkedin size={25} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
