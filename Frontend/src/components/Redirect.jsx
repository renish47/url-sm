import { useEffect } from "react";
import { useParams } from "react-router-dom";
import restApi from "../api";
import { toast } from "react-hot-toast";

const Redirect = () => {
  const { id: shortUrlId } = useParams();

  async function redirectUrl() {
    try {
      console.log(shortUrlId);
      const res = await restApi.post("/url/fetch", { shortUrlId });
      if (res.status === 200) {
        window.location.replace(res.data.originalUrl);
      }
    } catch (error) {
      const err = error.response;
      if (err.status === 400) {
        toast.error(err.data.message);
      }
    }
  }

  useEffect(() => {
    redirectUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default Redirect;
