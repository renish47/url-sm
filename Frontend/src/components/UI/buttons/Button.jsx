/* eslint-disable react/prop-types */

import DotLoader from "../loader/DotLoader";

const Button = ({ isLoading, onClickHandler, children, type }) => {
  return (
    <button
      type={type}
      className=" h-[35px] min-w-[100px] cursor-pointer rounded-md bg-primary px-[20px] py-1 text-center text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-80"
      onClick={onClickHandler}
      disabled={isLoading}
    >
      {isLoading ? <DotLoader /> : children}
    </button>
  );
};

Button.defaultProps = {
  isLoading: false,
};

export default Button;
