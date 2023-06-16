/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Button from "../UI/buttons/Button";

const Notification = ({ children, buttonName, title, onClickHandler }) => {
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center gap-9 ">
      <h2 className="text-xl">{title}</h2>
      {children}
      <Button type={"button"} onClickHandler={onClickHandler}>
        {buttonName}
      </Button>
    </div>
  );
};

export default Notification;
