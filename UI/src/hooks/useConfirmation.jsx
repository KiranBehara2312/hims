import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { META } from "../constants/projects";

const useConfirmation = () => {
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [justDisplayModal, setJustDisplayModal] = useState(false);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    console.log("Just", justDisplayModal);
  }, [justDisplayModal]);

  const openDialog = ({
    message = "",
    justDisplayModal = false,
    component = null,
    confirmCallback,
  }) => {
    setMessage(() => message);
    setJustDisplayModal(() => justDisplayModal);
    setOnConfirm(() => confirmCallback);
    setComponent(() => component);
    setOpen(true);
  };

  const closeDialog = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setOpen(false);
    setMessage(() => "");
    setJustDisplayModal(() => false);
    setComponent(() => null);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(true);
    }
    closeDialog();
  };

  const handleReject = () => {
    if (onConfirm) {
      onConfirm(false);
    }
    closeDialog();
  };

  const DialogComponent = (
    <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "0.7rem" }}>
        Message from {META.PROJECT_TITLE}
      </DialogTitle>
      <DialogContent sx={{ padding: "4px 20px !important" }}>
        <div style={{ whiteSpace: "pre-line" }}>{message}</div>
      </DialogContent>
      <DialogActions>
        {!justDisplayModal && (
          <>
            <Button
              onClick={handleReject}
              color="primary"
              size="small"
              variant="outlined"
            >
              No
            </Button>
            <Button
              onClick={handleConfirm}
              color="primary"
              autoFocus
              size="small"
              variant="outlined"
            >
              Yes
            </Button>
          </>
        )}
        {justDisplayModal && (
          <>
            <Button
              onClick={handleConfirm}
              color="primary"
              autoFocus
              size="small"
              variant="outlined"
            >
              Okay
            </Button>
          </>
        )}
        {component !== null && component}
      </DialogActions>
    </Dialog>
  );

  return {
    DialogComponent,
    openDialog,
    closeDialog,
  };
};

export default useConfirmation;
