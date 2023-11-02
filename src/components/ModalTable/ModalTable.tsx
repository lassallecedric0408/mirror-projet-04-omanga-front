import React from "react";
import { Modal, Box } from "@mui/material";
import { materialUITheme } from "../../utils/materialUITheme";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "60vh",
  bgcolor: "background.paper",
  border: `2px solid ${materialUITheme.palette.primary.main}`,
  boxShadow: 24,
  p: 4,
};

type ModalTableProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactElement;
};

const ModalTable: React.FC<ModalTableProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export { ModalTable };
