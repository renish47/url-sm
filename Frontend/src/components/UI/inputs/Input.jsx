/* eslint-disable react/prop-types */
import "./Input.css";

const Input = ({ type, id, placeholder, inputFlagged, setInputFlagged }) => {
  function inputHandler() {
    if (inputFlagged) setInputFlagged(false);
  }

  return (
    <div className="relative">
      <input
        type={type}
        name={id}
        id={id}
        placeholder=" "
        required
        onInput={inputHandler}
        className={`placeholder border-gray-400 border-[1px] w-[300px] h-[35px] outline-none ps-2 rounded-md ${
          inputFlagged ? "border-red-500" : ""
        }`}
      />
      <span
        className={`absolute -translate-y-[50%] top-[50%] left-4 text-gray-400 pointer-events-none text-[16px] transition-all bg-transparent ${
          inputFlagged ? "text-red-500" : ""
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
};

Input.defaultProps = {
  inputFlagged: false,
  setInputFlagged: () => {},
};

export default Input;
