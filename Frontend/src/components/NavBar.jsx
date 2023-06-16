/* eslint-disable react/prop-types */

import { toast } from "react-hot-toast";

const NavBar = ({ isLoggedIn, setCloseModal }) => {
  function logoutHandler() {
    setCloseModal(false);
    toast.success("Account Logged out");
    localStorage.removeItem("token");
  }
  return (
    <div className="navBar fixed left-0 top-0 z-10 flex h-[60px] w-full items-center justify-between px-6 text-white sm:px-10">
      <span className=" text-2xl font-semibold">url-sm</span>
      {isLoggedIn ? (
        <span
          className=" cursor-pointer text-[13px] sm:text-[15px]"
          onClick={logoutHandler}
        >
          Logout
        </span>
      ) : (
        <span
          className=" cursor-pointer text-[13px] sm:text-[15px]"
          onClick={() => setCloseModal(false)}
        >
          Login
        </span>
      )}
    </div>
  );
};

export default NavBar;
