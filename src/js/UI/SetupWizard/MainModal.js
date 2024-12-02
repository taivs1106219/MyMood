import React, { useState } from "react";
import cn from "classnames";
import { Modal, Button } from "react-bootstrap";
import P000 from "./P000";
import P001 from "./P001";

function MainModal({ showSetupWizard }) {
  const [contentControl, setContentControl] = useState(0);

  console.log(showSetupWizard.get());

  function ShowContent({ contentControl }) {
    switch (contentControl.get()) {
      case 0:
        return <P000 contentControl={contentControl}></P000>;
      case 1:
        return <P001 contentControl={contentControl}></P001>;
    }
  }

  return (
    <Modal
      show={showSetupWizard.get()}
      backdrop="static"
      centered
      keyboard={true}
      onHide={() => showSetupWizard.set(false)}
    >
      <Modal.Body>
        <ShowContent
          contentControl={{
            get: () => {
              return contentControl;
            },
            set: setContentControl,
          }}
        ></ShowContent>
      </Modal.Body>
    </Modal>
  );
}

export default MainModal;
