/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import BackButton from "../UI/buttons/BackButton";
import Button from "../UI/buttons/Button";
import restApi from "../../api";

const ForgetPassword = ({
  setOpenLoginModal,
  setOpenForgetPasswordModal,
  setOpenNotificationModal,
}) => {
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function checkFormValidity() {
    setIsFormValid(formRef.current.reportValidity());
  }

  async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    if (form.userEmail.value.slice(-4) != ".com") {
      toast.error("Please enter valid Email");
      return;
    }
    try {
      setIsLoading(true);
      let res = await restApi.post("user/send-resetmail", {
        email: form.userEmail.value,
      });
      if (res.status === 200) {
        setOpenNotificationModal(true);
        setOpenForgetPasswordModal(false);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else toast.error("Server Error");
    }
    setIsLoading(false);
  }
  function backToLogin() {
    setOpenForgetPasswordModal(false);
    setOpenLoginModal(true);
  }

  useEffect(() => {
    if (!isFormValid) {
      toast.error("Please enter valid input");
      setIsFormValid(true);
    }
  }, [isFormValid]);

  return (
    <>
      <BackButton onClickHandler={backToLogin} isLoading={isLoading} />
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className=" flex h-full w-full flex-col items-center justify-center gap-9 "
      >
        <h2 className="text-xl">Forget Password</h2>
        <div className="flex flex-col gap-3">
          <span className=" ps-1 text-sm text-gray-400">
            Enter your registered email address
          </span>
          <input
            autoFocus
            type="email"
            name="userEmail"
            required
            className="h-[35px] w-[300px] rounded-md border-[1px] border-gray-400 ps-2 outline-none"
          />
        </div>
        <Button
          type={"submit"}
          isLoading={isLoading}
          onClickHandler={checkFormValidity}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ForgetPassword;
