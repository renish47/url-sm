/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import Input from "../UI/inputs/Input";
import { toast } from "react-hot-toast";
import PasswordInp from "../UI/inputs/PasswordInp";
import Button from "../UI/buttons/Button";
import restApi from "../../api";

const Login = ({
  setOpenSignupModal,
  setOpenLoginModal,
  setOpenForgetPasswordModal,
  setCloseModal,
}) => {
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  function checkFormValidity() {
    setIsFormValid(formRef.current.reportValidity());
  }

  async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    if (form.userEmail.value.slice(-4) != ".com") {
      toast.error("Please enter valid Email");
      form.userEmail.focus();
      return;
    }
    try {
      setIsLoading(true);
      let res = await restApi.post("user/login", {
        email: form.userEmail.value,
        password: form.userPassword.value,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        form.userPassword.focus();
        setWrongPassword(true);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
        setWrongEmail(true);
        form.userEmail.focus();
      } else {
        toast.error("Try Again Later");
      }
    }
    setIsLoading(false);
  }

  function OpenSignIn() {
    setOpenSignupModal(true);
    setOpenLoginModal(false);
    setOpenForgetPasswordModal(false);
  }
  function openForgetPassword() {
    setOpenSignupModal(false);
    setOpenLoginModal(false);
    setOpenForgetPasswordModal(true);
  }

  useEffect(() => {
    if (!isFormValid) {
      toast.error("Please enter valid input");
      setIsFormValid(true);
    }
  }, [isFormValid]);

  return (
    <form
      ref={formRef}
      onSubmit={submitHandler}
      className=" flex h-full w-full flex-col items-center justify-center gap-9 "
    >
      <h2 className="text-xl">Welcome Back</h2>
      <Input
        type={"email"}
        id={"userEmail"}
        placeholder={"Email Address"}
        inputFlagged={wrongEmail}
        setInputFlagged={setWrongEmail}
      />
      <PasswordInp
        id={"userPassword"}
        placeholder={"Password"}
        inputFlagged={wrongPassword}
        setInputFlagged={setWrongPassword}
      />

      <Button
        type={"submit"}
        isLoading={isLoading}
        onClickHandler={checkFormValidity}
      >
        Login
      </Button>
      <div className=" flex gap-12 text-sm text-black">
        <span
          className="cursor-pointer transition-colors hover:text-[#ffcf30]"
          onClick={OpenSignIn}
        >
          New Account
        </span>
        <span
          className="cursor-pointer transition-colors hover:text-[#ffcf30]"
          onClick={openForgetPassword}
        >
          Forget Password
        </span>
      </div>
    </form>
  );
};

export default Login;
