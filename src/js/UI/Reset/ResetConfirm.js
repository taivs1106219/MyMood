import React from "react"; 
import { Modal,Button } from "react-bootstrap";
function ResetConfirm({ resetConfirm}) {
  function handleClose(){
    resetConfirm.set(false)
  }
  function handleReset(){
    api.send("reset-configs")
  }
  return (
    <Modal show={resetConfirm.get()} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>清除資料確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        點擊後將刪除包括並不限於您所有的心情筆記、心情數值、測驗作答記錄、寵物記錄、AI回覆記錄、您的暱稱、真實姓名以及預留的聯絡用電話號碼。欲保留請先使用匯出之功能儲存資料後再清除設定。
        <br></br>
        是否刪除？<br></br>
        <ins>*點擊刪除之後將自動退出APP，再次打開後即可重新設定</ins>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={handleReset}>
          是，刪除資料
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          否，我在想想
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetConfirm;