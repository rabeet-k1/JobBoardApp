import { Box, DialogContent, Typography } from "@mui/material";
import React, { useState } from "react";
import DialogFooter from "../dialog/dialogFooter";
import DialogHeader from "../dialog/dialogHeader";
import BootstrapDialog from "../dialog";

let refData = null;

const JobDetailModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  React.useImperativeHandle(ref, () => ({
    isOpenDialog(dataaaa) {
      refData = dataaaa;
      setOpen(true);
    },
  }));

  return (
    <Box>
      <BootstrapDialog onClose={() => ref.current.handleClose()} open={open}>
        <DialogHeader
          title={"Job Details"}
          handleClose={() => setOpen(false)}
        />
        <DialogContent dividers>
          <Typography>Name: {refData?.title}</Typography>
          <Typography>Company Name: {refData?.company_name}</Typography>
          <Typography>Job Type: {refData?.job_type}</Typography>
          <Typography>Salary: {refData?.salary}</Typography>
          <Typography sx={{ marginTop: "20px", fontWeight: "600" }}>
            Job Description:
          </Typography>
          <div
            style={{ padding: "0 20px" }}
            dangerouslySetInnerHTML={{ __html: refData?.description }}
          />
        </DialogContent>
        <DialogFooter type={refData?.type} handleClose={() => setOpen(false)} />
      </BootstrapDialog>
    </Box>
  );
});

export default JobDetailModal;
