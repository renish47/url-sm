/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import OtpInput from "../UI/inputs/OtpInput";
import Button from "../UI/buttons/Button";
import restApi from "../../api";

const OTPcheck = ({ setOpenOtpCheckModal, setOpenLoginModal, userData }) => {
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [timer, setTimer] = useState("01:00");
  const [resetTimer, setResetTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function checkFormValidity() {
    setIsFormValid(formRef.current.reportValidity());
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const otp =
      form.otpDigit1.value +
      form.otpDigit2.value +
      form.otpDigit3.value +
      form.otpDigit4.value +
      form.otpDigit5.value +
      form.otpDigit6.value;

    try {
      let res = await restApi.post("user/verify-email", {
        email: userData.email,
        otp,
      });
      if (res.status === 200) {
        toast.success("Account Created Successfully");
        setOpenOtpCheckModal(false);
        setOpenLoginModal(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.message);
      } else {
        toast.error("Try Again Later");
      }
    }

    setIsLoading(false);
  }

  async function resendOTPHandler() {
    setResetTimer((prev) => !prev);
    try {
      let res = await restApi.post("user/resend-otp", {
        email: userData.email,
        name: userData.firstName,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Try Again Later");
    }
  }

  useEffect(() => {
    if (!isFormValid) {
      toast.error("Please enter valid input");
      setIsFormValid(true);
    }
  }, [isFormValid]);

  useEffect(() => {
    let sec = 59;
    setTimer("01:00");
    const timerId = setInterval(() => {
      setTimer("00:" + ("0" + sec).slice(-2));
      sec--;
      if (sec < 0) clearInterval(timerId);
    }, 1000);
  }, [resetTimer]);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className=" flex h-full w-full flex-col items-center justify-center gap-9 "
      >
        <h2 className="text-xl">Two Step Verification</h2>
        <div className="flex flex-col gap-3">
          <span className=" ps-1 text-sm text-gray-700">
            Enter the OTP sent to your email
          </span>
          <div className="flex justify-center gap-1">
            <OtpInput name={"otpDigit1"} />
            <OtpInput name={"otpDigit2"} />
            <OtpInput name={"otpDigit3"} />
            <OtpInput name={"otpDigit4"} />
            <OtpInput name={"otpDigit5"} />
            <OtpInput name={"otpDigit6"} />
          </div>
        </div>
        <div className="flex gap-2 text-sm text-gray-400">
          <button
            type="button"
            disabled={timer === "00:00" ? false : true}
            className={
              timer === "00:00"
                ? "cursor-pointer text-blue-400 transition-colors hover:text-blue-500"
                : "cursor-default"
            }
            onClick={resendOTPHandler}
          >
            Resend OTP
          </button>
          {timer != "00:00" && (
            <>
              <span>in</span>
              <span>{timer}</span>
            </>
          )}
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

export default OTPcheck;
