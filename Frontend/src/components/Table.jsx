/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import restApi from "../api";
import Tr from "./Table/Tr";

// eslint-disable-next-line react/prop-types
const Table = ({ refreshTable, isLogged }) => {
  const [urlTableArray, setUrlTableArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await restApi.get("url/get-user-urls");
      if (res.status === 200) {
        setUrlTableArray(res.data.urls);
      }
    } catch (error) {
      const err = error.response;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [refreshTable]);

  useEffect(() => {
    if (!isLogged) setUrlTableArray([]);
    else fetchData();
  }, [isLogged]);

  return (
    <div className="relative -top-5 mx-auto flex min-h-[50vh] w-screen flex-col items-center gap-3 overflow-auto bg-secondary lg:-top-16 xl:-top-20">
      <table className=" table w-[95vw] border-separate text-[11px]  text-primary sm:w-[70vw] sm:text-base ">
        <thead className="bg-white text-primary shadow ">
          <tr>
            <th className="p-2 text-left sm:p-3 ">Original URL</th>
            {/* <th className="p-2 sm:p-3 text-left">Created</th> */}
            <th className="p-2 text-left sm:p-3">Short URL</th>
            <th className="p-2 text-center sm:p-3 sm:text-left">Clicks</th>
            <th className="p-2 text-left sm:p-3"></th>
          </tr>
        </thead>

        <tbody>
          {isLogged &&
            urlTableArray.map((url) => {
              return (
                <Tr url={url} key={url.shortUrlId} fetchData={fetchData} />
              );
            })}
        </tbody>
      </table>
      {urlTableArray.length === 0 && (
        <div className="block w-[95vw] bg-white py-6 text-center text-xs text-gray-400 shadow sm:w-[70vw] sm:py-4 sm:text-base">
          {" "}
          {isLoading ? "Loading..." : " No Short URL created yet"}
        </div>
      )}
    </div>
  );
};

export default Table;
