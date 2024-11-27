import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/NavigationContext";

export const SignUp = () => {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    useremail: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    useremail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const validate = (data) => {
    const errors = {};
    if (!data.useremail) {
      errors.useremail = "Email is required";
    } else if (!data.useremail.includes("@")) {
      errors.useremail = "Enter a valid Email address";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate(registerData);

    if (Object.keys(validationErrors).length === 0) {
      axiosClient
        .post("/users/register", registerData)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          toast.success("Register successful!");
          navigate("/login");
        })
        .catch(({ response }) => {
          toast.error(response?.data.error || "An error occurred");
        });
    } else {
      toast.warn("Please fill out all fields correctly!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-5">
      <ToastContainer />
      <form
        className="flex flex-col items-center w-full max-w-[90%] md:max-w-[587px] p-5 md:p-12 border border-[#B9B9B9] rounded-[15px] bg-white"
        onSubmit={handleLogin}
      >
        <p className="font-poppins font-semibold text-[14px] md:text-[18px] leading-6 text-[#64728C] opacity-80">
          Sign Up
        </p>

        <div className="flex flex-col justify-between w-full gap-4 mt-8 md:mt-10">
          <div className="w-full">
            <label
              htmlFor="Email"
              className="font-nunito text-[16px] md:text-[18px] font-semibold text-[#64728C] opacity-80"
            >
              Email address:
            </label>
            <input
              id="useremail"
              name="useremail"
              type="email"
              value={registerData.useremail}
              onChange={handleInputChange}
              className="block rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset mt-3 ring-gray-300 placeholder:text-[12px] md:placeholder:text-[14px] placeholder-nunito font-semibold focus:ring-1 focus:ring-inset w-full bg-[#F1F4F9]"
            />
            {formErrors.useremail && (
              <span className="text-xs font-medium text-red-500 font-poppins">
                {formErrors.useremail}
              </span>
            )}
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center">
              <label
                htmlFor="Password"
                className="font-nunito text-[16px] md:text-[18px] font-semibold text-[#64728C] opacity-80"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={registerData.password}
              onChange={handleInputChange}
              className="block rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset mt-3 ring-gray-300 placeholder:text-[12px] md:placeholder:text-[14px] placeholder-nunito font-semibold focus:ring-1 focus:ring-inset w-full bg-[#F1F4F9]"
            />
            {formErrors.password && (
              <span className="text-xs font-medium text-red-500 font-poppins">
                {formErrors.password}
              </span>
            )}
          </div>
        </div>

        <button
          className="w-full max-w-[389px] h-[56px] bg-[#002c65] flex justify-center p-3 text-white font-poppins text-[16px] md:text-[20px] font-bold rounded-[10px] mt-8 cursor-pointer border border-black"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
