/* eslint-disable react/prop-types */

const ModalFrame = ({ children }) => {
  return (
    <div className=" bg-[#000000c9] w-screen h-screen  absolute top-0 left-0 z-[50] ">
      <div className=" absolute -translate-x-[50%] -translate-y-[50%] top-[50vh] left-[50vw]  min-h-fit px-6 pt-5 pb-8 min-w-fit bg-white rounded-md shadow-2xl z-[60]  transition-transform">
        {children}
      </div>
    </div>
  );
};

export default ModalFrame;
