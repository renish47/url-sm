import { toast } from "react-hot-toast";
import restApi from "../api";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const MainSection = ({ setRefreshTable, setCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      let url = event.target.urlInp.value;
      const res = await restApi.post("url/create-shorturl-id", { url });
      if (res.status === 201) {
        event.target.reset();
        setRefreshTable((prev) => !prev);
        toast.success("Short Url Created Successfully");
      }
    } catch (error) {
      const err = error.response;
      if (err.status === 400) {
        toast.error(err.data.message);
      }
      if (err.status === 401) {
        toast.error("Session Timeout");
        localStorage.removeItem("token");
        setCloseModal(false);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className=" flex  h-[50vh] w-screen justify-center bg-primary">
      <div className=" flex h-full flex-col items-center justify-center gap-10 pt-14 sm:items-start sm:pb-5 sm:pt-36">
        <h2 className=" text-2xl text-white sm:text-4xl">
          Simplify your Links
        </h2>
        <form
          className="flex w-full flex-col items-center gap-4 sm:inline-block"
          onSubmit={submitHandler}
        >
          <input
            type="url"
            name="urlInp"
            id="urlInp"
            placeholder="Your original URL here"
            className=" h-10 w-[90vw] rounded-2xl  px-3 outline-none sm:h-12 sm:w-[50vw]"
          />
          <button
            type="submit"
            className=" h-8  w-[120px] bg-white px-1 text-sm font-bold text-black transition-colors duration-300 hover:bg-secondary disabled:pointer-events-none disabled:opacity-70   sm:ms-7 sm:h-11 sm:w-[150px] sm:px-5 sm:text-lg "
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Shorten URL"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainSection;
