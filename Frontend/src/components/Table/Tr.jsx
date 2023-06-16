/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import restApi from "../../api";
import { toast } from "react-hot-toast";

// const baseUrl = "localhost:5173/";
const baseUrl = "url-sm.netlify.app/";

const Tr = ({ url, fetchData }) => {
  const [isDeleteButtonClicked, setisDeleteButtonClicked] = useState(false);
  const [clicks, setClicks] = useState(url.clicks);

  async function deleteUrlHandler(urlId) {
    setisDeleteButtonClicked(true);
    try {
      const res = await restApi.delete(`url/delete/${urlId}`);
      if (res.status === 200) {
        await fetchData();
        toast.success("URL Deleted");
      }
    } catch (error) {
      const err = error.response;
    }
  }

  let originalUrl = url.originalUrl.split("https://")[1];
  if (originalUrl.length > 25) {
    originalUrl = originalUrl.slice(0, 25) + " " + originalUrl.slice(25);
  }
  if (originalUrl.length > 50) {
    originalUrl = originalUrl.slice(0, 50) + " " + originalUrl.slice(50);
  }

  let shorturl = baseUrl + url.shortUrlId;
  if (shorturl.length > 14) {
    shorturl = shorturl.slice(0, 14) + " " + shorturl.slice(14);
  }
  if (shorturl.length > 30) {
    shorturl = shorturl.slice(0, 30) + " " + shorturl.slice(30);
  }

  return (
    <tr
      className={`bg-white shadow ${
        isDeleteButtonClicked ? " pointer-events-none opacity-50" : ""
      }`}
    >
      <td className="w-[20%] whitespace-pre-line p-2 sm:w-1/2 sm:p-3 ">
        <div className="align-items-center flex">
          <a
            href={url.originalUrl}
            target="_blank"
            rel="noreferrer"
            className=" underline transition-all hover:text-blue-400 "
          >
            {originalUrl}
          </a>
        </div>
      </td>
      {/* <td className="p-2 sm:p-3">
              0 min<span className=" hidden sm:inline">utes</span> ago
            </td> */}
      <td className="w-[20%] p-2 sm:w-[25%] sm:p-3  lg:w-[30%]">
        <a
          href={"http://" + baseUrl + url.shortUrlId}
          target="_blank"
          rel="noreferrer"
          className=" underline transition-all hover:text-blue-400"
          onClick={() => {
            setClicks((prev) => prev + 1);
          }}
        >
          {shorturl}
        </a>
      </td>
      <td className="p-2 text-center sm:p-3 sm:text-left">{clicks}</td>
      <td className="p-2 sm:p-3">
        <button>
          <FaTrashAlt
            className=" h-[13px] w-[13px] transition-colors duration-200 hover:text-red-600"
            onClick={() => deleteUrlHandler(url._id)}
          />
        </button>
      </td>
    </tr>
  );
};

export default Tr;
