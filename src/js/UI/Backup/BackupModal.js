import React, { useEffect, useState } from "react";
import icons from "../../../../res/icons/icons";
import * as bootstrap from "bootstrap";

function BackupModal() {
  const [destination, setDestination] = useState("");

  async function handleSelectFolder(e) {
    setDestination(await api.invoke("open-folder"));
  }
  function handleConfirm() {
    if (destination != "") {
      api.send("create-backup", destination);
    }
  }
  useEffect(() => {
    api.handle("export-completed", () => {
      const successModal = new bootstrap.Modal(
        document.getElementById("modal-success")
      );
      successModal.show();
    });
    return () => api.removeIPCListener("export-completed");
  });
  return (
    <div className="modal fade" tabIndex={-1} id="backup-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">選擇欲匯出的位置</h5>
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
                  className="btn btn-primary"
                  onClick={handleSelectFolder}
                >
                  <icons.Files></icons.Files>選擇路徑
                </button>
                <span>{destination}</span>
              </div>
              <div className="text-warning">
                <ins>*請選擇路徑後再按確定</ins>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
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
function BackupSuccessModal() {
  return (
    <div
      className="modal fade"
      id="modal-success"
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
          <div className="modal-body">匯出成功！</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
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
  BackupModal: BackupModal,
  BackupSuccessModal: BackupSuccessModal,
};
