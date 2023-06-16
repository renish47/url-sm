/* eslint-disable react/prop-types */
import "./OtpInput.css";

const OtpInput = ({ name }) => {
  function onInputHandler(event) {
    let thisElement = event.target;
    try {
      if (thisElement.nextSibling && thisElement.value.length != 0) {
        thisElement.nextSibling.focus();
      }
      if (thisElement.value.length === 0) {
        thisElement.previousElementSibling.focus();
      }
      if (thisElement.value.length === 6) {
        let otpArr = thisElement.value.split("");
        thisElement.form.otpDigit1.value = otpArr[0];
        thisElement.form.otpDigit2.value = otpArr[1];
        thisElement.form.otpDigit3.value = otpArr[2];
        thisElement.form.otpDigit4.value = otpArr[3];
        thisElement.form.otpDigit5.value = otpArr[4];
        thisElement.form.otpDigit6.value = otpArr[5];
        thisElement.form.otpDigit6.focus();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <input
      onInput={onInputHandler}
      type="number"
      name={name}
      id={name}
      required
      pattern="\d*"
      className="border-gray-400 border-[1px] w-[40px] h-[35px] outline-none rounded-md text-center"
    />
  );
};

export default OtpInput;
