/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import Login from "./Modals/Login";
import ModalFrame from "./UI/frames/ModalFrame";
import Signup from "./Modals/Signup";
import ForgetPassword from "./Modals/ForgetPassword";
import OTPcheck from "./Modals/OTPcheck";
import Notification from "./Modals/Notification";

const Modals = ({ setCloseModal }) => {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openForgetPasswordModal, setOpenForgetPasswordModal] = useState(false);
  const [openOtpCheckModal, setOpenOtpCheckModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(true);
  const [userData, setUserData] = useState({});

  function backToLogin() {
    setOpenNotificationModal(false);
    setOpenLoginModal(true);
  }

  return (
    <ModalFrame>
      {openLoginModal && (
        <Login
          setOpenSignupModal={setOpenSignupModal}
          setOpenLoginModal={setOpenLoginModal}
          setOpenForgetPasswordModal={setOpenForgetPasswordModal}
          setOpenOtpCheckModal={setOpenOtpCheckModal}
          setCloseModal={setCloseModal}
        />
      )}
      {openForgetPasswordModal && (
        <ForgetPassword
          setOpenLoginModal={setOpenLoginModal}
          setOpenForgetPasswordModal={setOpenForgetPasswordModal}
          setOpenNotificationModal={setOpenNotificationModal}
        />
      )}
      {openSignupModal && (
        <Signup
          setOpenSignupModal={setOpenSignupModal}
          setOpenLoginModal={setOpenLoginModal}
          setOpenOtpCheckModal={setOpenOtpCheckModal}
          setUserData={setUserData}
        />
      )}
      {openOtpCheckModal && (
        <OTPcheck
          setOpenOtpCheckModal={setOpenOtpCheckModal}
          setOpenLoginModal={setOpenLoginModal}
          userData={userData}
        />
      )}

      {openNotificationModal && (
        <Notification
          onClickHandler={backToLogin}
          buttonName={"Back to login"}
          title={"Reset Password"}
        >
          <span className="px-5 text-center">
            A link has been sent to your registered email address <br /> to
            reset your password
          </span>
        </Notification>
      )}
    </ModalFrame>
  );
};

export default Modals;
