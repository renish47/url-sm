import { BiArrowBack } from "react-icons/bi";
// eslint-disable-next-line react/prop-types
const BackButton = ({ onClickHandler, isLoading }) => {
  return (
    <button
      onClick={onClickHandler}
      className=" cursor-pointer rounded-full bg-white p-3 transition-all hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-70"
      disabled={isLoading}
    >
      <BiArrowBack />
    </button>
  );
};

BackButton.defaultProps = {
  onClickHandler: () => {},
  isLoading: false,
};

export default BackButton;
