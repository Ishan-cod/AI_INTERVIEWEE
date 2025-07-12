import Link from "next/link";
import React from "react";

const FloatingFooter = () => {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-2 z-50">
      <p className="text-gray-800 font-semibold">
        Built by{" "}
        <Link
          href={"https://www.linkedin.com/in/ishan-jaiswal-178b71313"}
          target="_blank"
        >
          <span className="text-blue-500">Ishan Jaiswal</span>
        </Link>
      </p>
    </footer>
  );
};

export default FloatingFooter;
