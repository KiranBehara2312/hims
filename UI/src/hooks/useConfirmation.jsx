import React, { useState } from "react";
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

  const openDialog = (message, confirmCallback) => {
    setMessage(message);
    setOnConfirm(() => confirmCallback);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
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
      <DialogTitle sx={{ fontSize: "13px" }}>
        Message from {META.PROJECT_TITLE}
      </DialogTitle>
      <DialogContent sx={{ padding: "4px 20px !important" }}>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Yes
        </Button>
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
