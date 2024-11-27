import React, { useEffect, useState } from "react";
import icons from "../../../../res/icons/icons";
import * as bootstrap from "bootstrap";

function ImportModal() {
  const [destination, setDestination] = useState("");

  useEffect(() => {
    api.handle("import-completed", () => {
      const successModal = new bootstrap.Modal(
        document.getElementById("modal-import-success")
      );
      successModal.show();
    });
    return () => api.removeIPCListener("import-completed");
  });

  async function handleSelectFolder(e) {
    setDestination(await api.invoke("open-file"));
  }
  function handleConfirm() {
    if (destination != "") {
      api.send("import-config", destination);
    }
  }
  return (
    <div className="modal fade" tabIndex={-1} id="import-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">選擇欲匯入的檔案</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column">
              <div>
                <button
                  className="btn btn-primary rounded-pill mb-2"
                  onClick={handleSelectFolder}
                >
                  <icons.Files></icons.Files>選擇檔案
                </button>
                <span>{destination}</span>
              </div>
              <div className="text-warning">
                <ins>*請選擇檔案後再按確定</ins>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary rounded-pill"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleConfirm}
              data-bs-dismiss="modal"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImportSuccessModal() {
  function handleRestartClick() {
    api.send("restart-app");
  }

  return (
    <div
      className="modal fade"
      id="modal-import-success"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              匯出結果
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            匯入成功，請立即
            <a href="#" onClick={handleRestartClick}>
              重啓APP
            </a>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              data-bs-dismiss="modal"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  ImportModal: ImportModal,
  ImportSuccessModal: ImportSuccessModal,
};
