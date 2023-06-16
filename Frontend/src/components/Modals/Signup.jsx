/* eslint-disable react/prop-types */

import Input from "../UI/inputs/Input";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import PasswordInp from "../UI/inputs/PasswordInp";
import BackButton from "../UI/buttons/BackButton";
import Button from "../UI/buttons/Button";
import restApi from "../../api";

const SignIn = ({
  setOpenSignupModal,
  setOpenLoginModal,
  setOpenOtpCheckModal,
  setUserData,
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
      setWrongEmail(true);
      form.userEmail.focus();
      return;
    }
    if (form.userPassword.value.length < 6) {
      toast.error("Password is too weak");
      setWrongPassword(true);
      form.userPassword.focus();
      return;
    }
    try {
      const userData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.userEmail.value,
        password: form.userPassword.value,
      };
      setIsLoading(true);
      let res = await restApi.post("user/create", userData);
      if (res.status === 201) {
        setUserData(userData);
        setOpenOtpCheckModal(true);
        setOpenSignupModal(false);
      }
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(error.response.data.message);
        setWrongEmail(true);
        form.userEmail.focus();
      } else {
        toast.error("Try Again Later");
      }
    }
    setIsLoading(false);
  }

  function backToLogin() {
    setOpenSignupModal(false);
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
        <h2 className="text-xl">Create New Account</h2>
        <Input type={"text"} id={"firstName"} placeholder={"First Name"} />
        <Input type={"text"} id={"lastName"} placeholder={"Last Name"} />
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
          strengthCheck={true}
        />

        <Button
          type={"submit"}
          isLoading={isLoading}
          onClickHandler={checkFormValidity}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default SignIn;
