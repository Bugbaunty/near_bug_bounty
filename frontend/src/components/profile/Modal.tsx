import React, { useState } from "react";
import { useRouter } from "next/router";

// Modal Component
const Modal = ({ isOpen, onClose }) => {
  const router = useRouter();
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-center mb-5">
          <h2 className="text-lg font-bold mb-4">Choose an Option</h2>
        </div>
        <div className="flex justify-around">
          <button
            onClick={() => {
              router.push("/create-bounty");
              onClose(); // Close the modal after clicking
            }}
            className=" text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Create a Bounty
          </button>
          <button
            onClick={() => {
              router.push("/dashboard");
              onClose(); // Close the modal after clicking
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Join a Bounty
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
