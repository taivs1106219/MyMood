import React, { useEffect, useState } from "react";
import icons from "../../../../res/icons/icons";
import * as bootstrap from "bootstrap";

function BackupModal() {
  const [destination, setDestination] = useState("");
  const [deleteMoodNote, setDeleteMoodNote] = useState(0);
  const [deleteNickname, setDeleteNickname] = useState(0);

  const exportConfig = {
    deleteMoodNote: deleteMoodNote,
    deleteNickname: deleteNickname,
  };

  async function handleSelectFolder(e) {
    setDestination(await api.invoke("open-folder"));
  }
  function handleConfirm() {
    if (destination != "") {
      api.send("create-backup", [destination, JSON.stringify(exportConfig)]);
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
                  className="btn btn-primary rounded-pill mb-2"
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
            匯入心理師端時：
            <div className="ms-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={deleteMoodNote}
                  id="deleteMoodNote"
                  onClick={() => setDeleteMoodNote(deleteMoodNote ^ 1)}
                />
                <label
                  className="form-check-label user-select-none"
                  htmlFor="deleteMoodNote"
                >
                  刪除心情日記
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={deleteNickname}
                  id="deleteNickname"
                  onClick={() => setDeleteNickname(deleteNickname ^ 1)}
                />
                <label
                  className="form-check-label user-select-none"
                  htmlFor="deleteNickname"
                >
                  刪除用戶昵稱
                </label>
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
  BackupModal: BackupModal,
  BackupSuccessModal: BackupSuccessModal,
};
