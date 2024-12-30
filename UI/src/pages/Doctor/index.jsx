import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { FaUserDoctor, FaUserLargeSlash } from "react-icons/fa6";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button, Dialog, DialogContent, useTheme } from "@mui/material";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaCaretSquareRight,
  FaEdit,
  FaEye,
  FaLock,
  FaLockOpen,
  FaPlus,
  FaStethoscope,
  FaTrash,
} from "react-icons/fa";
import DoctorInformation from "./AddEdits";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { ADMIN, STAFF } from "../../constants/roles";
import { useSelector } from "react-redux";
import { camelToTitle } from "../../helpers";
import WorkInProgress from "../../components/shared/WorkInProgress";
import GenerateSlots from "./AddEdits/GenerateSlots";

const ACTIONS = [
  {
    name: "Edit",
    privilege: "EDIT",
    icon: <IconWrapper defaultColor icon={<FaEdit size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "View",
    privilege: "VIEW",
    icon: <IconWrapper defaultColor icon={<FaEye size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Generate Slots",
    privilege: "GENERATE_SLOTS",
    icon: <IconWrapper defaultColor icon={<FaCalendarCheck size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "sm",
  },
  {
    name: "Doctor Availability",
    privilege: "DOCTOR_AVAILABILITY",
    icon: <IconWrapper defaultColor icon={<FaStethoscope size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "sm",
  },
  {
    name: "Disable/Enable Doctor",
    privilege: "DISABLE_ENABLE_DOCTOR",
    icon: (
      <IconWrapper
        defaultColor
        icon={
          <>
            <FaUserLargeSlash size={12} /> <FaUserDoctor size={12} />
          </>
        }
      />
    ),
    disabled: false,
    access: [ADMIN],
    modalWidth: "sm",
  },
  {
    name: "Lock/Unlock Doctor",
    privilege: "LOCK_UNLOCK_DOCTOR",
    icon: (
      <IconWrapper
        defaultColor
        icon={
          <>
            <FaLock size={13} />
            <FaLockOpen size={13} />
          </>
        }
      />
    ),
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "sm",
  },
];
const Doctor = () => {
  const theme = useTheme();
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });
  const [selectedDoc, setSelectedDoc] = useState({
    action: "Add",
    data: null,
  });
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    fetchDoctors({
      page: 1,
      limit: 10,
    });
  }, [showDialog.rerender]);

  const Buttons = () => {
    return (
      <Button variant="outlined" size="small" onClick={addDoctorHandler}>
        <FaPlus size={15} style={{ marginRight: "8px" }} /> Add Doctor
      </Button>
    );
  };
  const fetchDoctors = async (paginationObj) => {
    const response = await postData(`/doctor/doctors`, paginationObj);
    if (response) {
      const oneObj = response?.data?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 170,
            type: x === "createdAt" || x === "updatedAt" ? "date" : "string",
          };
        }),
        data: response?.data ?? [],
        totalCount: response?.totalPages || 0,
        defaultPage: response?.page || 0,
      });
    } else {
      setTableObj({
        columns: [],
        data: [],
        totalCount: 0,
        defaultPage: 0,
      });
    }
  };
  const addDoctorHandler = () => {
    setSelectedDoc({
      action: "ADD",
      data: null,
    });
    setShowDialog({
      show: true,
      rerender: false,
      modalWidth: "md",
    });
  };

  const actionsHandler = (action, modalWidth, row) => {
    setSelectedDoc({
      action,
      data: row,
    });
    setShowDialog({
      show: true,
      rerender: false,
      modalWidth: modalWidth,
    });
  };

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedDoc({ action: null, data: null });
  };

  const CloseBtnHtml = () => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="error"
        sx={{
          maxWidth: "30px !important",
          minWidth: "30px !important",
          width: "30px !important",
        }}
        onClick={() => closeDialog()}
      >
        X
      </Button>
    );
  };

  const getDialogContent = (action) => {
    switch (action) {
      case "VIEW":
      case "EDIT":
      case "ADD":
        return (
          <DoctorInformation
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`${camelToTitle(
              selectedDoc?.action.toLocaleLowerCase()
            )} Doctor`}
            selectedRow={selectedDoc?.data}
            action={selectedDoc?.action}
            setShowDialog={setShowDialog}
          />
        );

      case "GENERATE_SLOTS":
        return (
          <GenerateSlots
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Generate Slots for Dr.${selectedDoc?.data?.firstName} ${selectedDoc?.data?.lastName}`}
            selectedRow={selectedDoc?.data}
            action={selectedDoc?.action}
            setShowDialog={setShowDialog}
          />
        );
      default:
        return (
          <>
            <HeaderWithSearch
              hideSearchBar
              headerText={action}
              html={<CloseBtnHtml />}
            />
            <WorkInProgress />
          </>
        );
    }
  };
  return (
    <>
      <HeaderWithSearch
        headerText="Doctor"
        hideSearchBar
        html={<Buttons />}
        headerIcon={
          <IconWrapper
            icon={<FaUserDoctor size={20} color={theme.palette.primary.main} />}
          />
        }
      />
      {tableObj.columns?.length > 0 && (
        <MyTable
          {...tableObj}
          helperNote={"Note: Right click on a record to view actions"}
          actions={ACTIONS.filter((x) => x.access.includes(loggedInUser?.role))}
          actionWithRecord={actionsHandler}
          changedPage={(newPage) => {
            fetchMastersData({
              page: newPage,
              limit: 10,
            });
          }}
        />
      )}

      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>
            {getDialogContent(selectedDoc.action)}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Doctor;
