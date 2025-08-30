import React from "react";
import { UseContext } from "../../../context/ContextProvider";
import { CircularProgress, Modal } from "@mui/material";
import logo from '../../resources/home/Group134.png'
const LoaderModal = () => {
    const {loadingModal} = UseContext()
  return (
    <Modal keepMounted open={loadingModal.isLoading}>
      <div
        style={{
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
        className="mx-auto rounded-2xl flex justify-center flex-col items-center px-12 py-6 pt-8 absolute top-[50%] left-[50%]"
      >
        <div className="w-[400px] p-8 bg-white rounded-lg flex flex-col items-center justify-center gap-4">
          <img src={logo} alt="decision" className="h-auto w-32 object-contain" />
          <span className="text-center">{loadingModal.loaderMsg}</span>
          <CircularProgress thickness={7} />
        </div>
      </div>
    </Modal>
  );
};

export default LoaderModal;
