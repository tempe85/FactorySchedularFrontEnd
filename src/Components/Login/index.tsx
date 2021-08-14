import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface IProps {
  toggle: () => void;
  isOpen: boolean;
}

export function LoginModal({ toggle, isOpen }: IProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div style={{ textAlign: "center" }}>Signup for FactoryScheduler</div>
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "60%" }}>
            <h3 style={{ textAlign: "center" }}>Register</h3>
            User name: <Input />
            Password <Input />
            <Button style={{ width: "100%" }} color="primary" onClick={toggle}>
              Submit Registration
            </Button>
          </div>
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <Button style={{ width: "100%" }} color="secondary" onClick={toggle}>
          Or Sign Up
        </Button>
      </ModalFooter> */}
    </Modal>
  );
}
