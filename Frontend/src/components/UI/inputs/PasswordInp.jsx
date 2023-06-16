/* eslint-disable react/prop-types */

import { BiShowAlt, BiHide } from "react-icons/bi";
import { useState } from "react";

import "./PasswordInp.css";

const PasswordInp = ({
  id,
  placeholder,
  inputFlagged,
  setInputFlagged,
  strengthCheck,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  function passwordHandler(event) {
    if (inputFlagged) setInputFlagged(false);
    if (event.target.value.length >= 6 && strengthCheck)
      setIsStrongPassword(true);
    else setIsStrongPassword(false);
  }

  function onBlurHandler() {
    setIsStrongPassword(false);
  }

  return (
    <div
      className={`border-gray-400 border-[1px] w-[300px] h-[35px]  rounded-md flex  items-center gap-2 ${
        inputFlagged ? "border-red-500" : ""
      } ${isStrongPassword ? "border-green-500" : ""}`}
    >
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={id}
          id={id}
          placeholder=" "
          required
          onInput={passwordHandler}
          onFocus={passwordHandler}
          onBlur={onBlurHandler}
          className="Passwordplaceholder outline-none ps-2 w-[260px] h-[26px] "
        />
        <span
          className={`absolute -translate-y-[50%] top-[50%] left-4 text-gray-400 pointer-events-none text-[16px] transition-all bg-transparent ${
            inputFlagged ? "text-red-500" : ""
          } ${isStrongPassword ? "text-green-500" : ""}`}
        >
          {placeholder}
        </span>
      </div>
      {showPassword ? (
        <BiShowAlt
          className=" text-xl text-gray-500 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ) : (
        <BiHide
          className=" text-xl text-gray-500 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
};

PasswordInp.defaultProps = {
  inputFlagged: false,
  setInputFlagged: () => {},
};

export default PasswordInp;
