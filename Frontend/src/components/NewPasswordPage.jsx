/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import PasswordInp from "./UI/inputs/PasswordInp";
import Button from "./UI/buttons/Button";
import restApi from "../api";

const NewPasswordPage = () => {
  const { id: userId } = useParams();
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadPage, setLoadPage] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationContent, setnotificationContent] = useState(
    "Now go back to the home page and login with your new password"
  );
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigate = useNavigate();

  function checkFormValidity() {
    setIsFormValid(formRef.current.reportValidity());
  }

  async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    if (form.userPassword.value.length < 6) {
      toast.error("Password is too weak");
      setWrongPassword(true);
      form.userPassword.focus();
      return;
    }
    try {
      setIsLoading(true);
      let res = await restApi.put("user/reset-password", {
        password: form.userPassword.value,
        userId,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setOpenNotification(true);
      }
    } catch (error) {
      toast.error("Server Error");
    }
    setIsLoading(false);
  }

  async function checkUrlValidity() {
    try {
      await restApi.post("user/url-validity", { userId });
    } catch (error) {
      if (error.response.status === 498) {
        setnotificationContent(
          "The validity of this URL to reset password was Expired"
        );
        setOpenNotification(true);
      }
    }
    setLoadPage(true);
  }

  useEffect(() => {
    if (!isFormValid) {
      toast.error("Please enter valid input");
      setIsFormValid(true);
    }
  }, [isFormValid]);

  useEffect(() => {
    checkUrlValidity();
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-7 overflow-hidden">
      <span className=" absolute -right-7 top-12 h-[30px] w-[40vw] -rotate-12 rounded-xl bg-secondary sm:w-[30vw] " />
      <span className=" absolute -right-7 top-20 h-[30px] w-[30vw] -rotate-12  rounded-xl bg-secondary sm:w-[20vw]" />
      {loadPage && (
        <>
          <h1 className=" ita text-4xl font-bold text-primary ">Url-Sm</h1>
          {openNotification ? (
            <div className=" mx-3 mb-5 flex flex-col items-center justify-center gap-9 rounded-2xl border-[1px] px-5 py-10 shadow-xl">
              <h4 className=" ps-1 text-sm text-gray-700">
                {notificationContent}
              </h4>
              <Button type={"button"} onClickHandler={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={submitHandler}
              className=" mx-3 mb-5 flex flex-col items-center justify-center gap-9 rounded-2xl border-[1px] px-5 py-10 shadow-xl"
            >
              <h4 className=" ps-1 text-sm text-gray-700">
                Type in the new password to replace your old password
              </h4>
              <PasswordInp
                id={"userPassword"}
                placeholder={"New Password"}
                inputFlagged={wrongPassword}
                setInputFlagged={setWrongPassword}
                strengthCheck={true}
              />

              <Button
                type={"submit"}
                isLoading={isLoading}
                onClickHandler={checkFormValidity}
              >
                Save
              </Button>
            </form>
          )}
        </>
      )}
      <span className=" absolute -left-7 bottom-12 h-[30px] w-[40vw] -rotate-12 rounded-xl bg-secondary sm:w-[30vw]" />
      <span className=" absolute -left-7 bottom-20 h-[30px] w-[30vw] -rotate-12 rounded-xl bg-secondary sm:w-[20vw]" />
    </div>
  );
};

export default NewPasswordPage;
