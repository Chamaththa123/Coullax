import React from "react";
import { useStateContext } from "../contexts/NavigationContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = () => {
  const { user, setUser, setToken } = useStateContext();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
      customClass: {
        title: "font-poppins",
        content: "font-poppins",
        actions: "font-poppins",
        confirmButton: "font-poppins",
        cancelButton: "font-poppins",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        setToken(null);
      }
    });
  };

  return (
    <div className="md:flex md:justify-between font-poppins">
      <div className="md:text-[30px] text-[25px] font-bold text-[#002c65]">
        Coullax Book Reviews
      </div>
      <div className="flex gap-5 md:mt-0 mt-5">
        <span>{user.useremail}</span>
        <button
          onClick={() => handleLogout()}
          className="px-3 bg-[#002c65] text-white font-medium  border-[2px] border-transparent rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
