import { useEffect, useState } from "react";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import Modals from "./components/Modals";
import restApi from "./api";
import { toast } from "react-hot-toast";

function UrlSm() {
  const [closeModal, setCloseModal] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);
  async function checkForToken() {
    try {
      let res = await restApi.get("user/verify-userToken");
      if (res.status === 200) setRefreshTable((prev) => !prev);
    } catch (error) {
      toast.error("Session Timeout");
      setCloseModal(false);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) checkForToken();
    else setCloseModal(false);
  }, []);

  return (
    <div
      className={`${closeModal ? "" : "overflow-hidden "} h-screen w-screen`}
    >
      {!closeModal && <Modals setCloseModal={setCloseModal} />}
      <NavBar isLoggedIn={closeModal} setCloseModal={setCloseModal} />
      <MainSection
        setRefreshTable={setRefreshTable}
        setCloseModal={setCloseModal}
      />
      <div className="h-[20vw] w-screen bg-[url('../public/curves.svg')] bg-cover bg-bottom bg-no-repeat" />
      <Table refreshTable={refreshTable} isLogged={closeModal} />
    </div>
  );
}

export default UrlSm;
