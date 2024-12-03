import React, { useState } from "react";
import cn from "classnames";
import { Modal, Button } from "react-bootstrap";
import P000 from "./P000";
import P001 from "./P001";
import P101 from "./P101";
import P102 from "./P102";
import P202 from "./P103";
import P201 from "./P201";

function MainModal({ showSetupWizard, config, dataPath }) {
  const [contentControl, setContentControl] = useState(0);

  console.log(showSetupWizard.get());

  function ShowContent({ contentControl }) {
    switch (contentControl.get()) {
      case 0:
        return <P000 contentControl={contentControl}></P000>;
      case 1:
        return <P001 contentControl={contentControl}></P001>;
      case 101:
        return (
          <P101
            config={config}
            contentControl={contentControl}
            dataPath={dataPath}
          ></P101>
        );
      case 102:
        return (
          <P102
            config={config}
            contentControl={contentControl}
            dataPath={dataPath}
          ></P102>
        );
      case 103:
        return (
          <P202
            contentControl={contentControl}
            config={config}
            dataPath={dataPath}
          ></P202>
        );
      case 201:
        return <P201 contentControl={contentControl}></P201>;
      case 202:
        return (
          <P202
            contentControl={contentControl}
            config={config}
            dataPath={dataPath}
          ></P202>
        );
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
