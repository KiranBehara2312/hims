import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import {
  FaAddressCard,
  FaCalendar,
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaHistory,
  FaPrint,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";
import { MdNoteAlt, MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Registration from "../registration";
import { useSelector } from "react-redux";
import { ADMIN, DOCTOR, NURSE, STAFF } from "../../constants/roles";
import { camelToTitle } from "../../helpers";
import PatientVitals from "./AddEdits/PatientVitals";
import NoDataFound from "../../components/shared/NoDataFound";
import WorkInProgress from "../../components/shared/WorkInProgress";
import PatientRegnCard from "./AddEdits/PatientRegnCard";

const ACTIONS = [
  {
    name: "Edit",
    privilege: "EDIT",
    icon: <IconWrapper defaultColor icon={<FaEdit size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "xl",
  },
  {
    name: "View",
    privilege: "VIEW",
    icon: <IconWrapper defaultColor icon={<FaEye size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF, NURSE, DOCTOR],
    modalWidth: "xl",
  },
  {
    name: "Patient Vitals",
    privilege: "PATIENT_VITALS",
    icon: <IconWrapper defaultColor icon={<MdNoteAlt size={18} />} />,
    disabled: false,
    access: [ADMIN, NURSE, DOCTOR],
    modalWidth: "lg",
  },
  {
    name: "Patient Registration Card",
    privilege: "PATIENT_REGISTRATION_CARD",
    icon: <IconWrapper defaultColor icon={<FaAddressCard size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "sm",
  },
  {
    name: "Book an Appointment",
    privilege: "BOOK_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaCalendarAlt size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Visit History",
    privilege: "VISIT_HISTORY",
    icon: <IconWrapper defaultColor icon={<FaHistory size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF, NURSE, DOCTOR],
    modalWidth: "md",
  },
  {
    name: "Prescription Notes",
    privilege: "PRESCRIPTION_NOTES",
    icon: <IconWrapper defaultColor icon={<GrNotes size={18} />} />,
    disabled: false,
    access: [ADMIN, NURSE, DOCTOR],
    modalWidth: "md",
  },
  {
    name: "Prescription Print",
    privilege: "PRESCRIPTION_PRINT",
    icon: <IconWrapper defaultColor icon={<FaPrint size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
];

const Patients = () => {
  const theme = useTheme();
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });

  const [selectedPatient, setSelectedPatient] = useState({
    action: "",
    data: null,
  });

  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    fetchPatients({
      page: 1,
      limit: 10,
    });
  }, [showDialog.rerender]);

  const fetchPatients = async (paginationObj) => {
    const response = await postData(`/patients/all`, paginationObj);
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

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedPatient({ action: null, data: null });
  };

  const Buttons = () => {
    return (
      <>
        {(loggedInUser?.role === STAFF || loggedInUser?.role === ADMIN) && (
          <Button variant="outlined" size="small" onClick={newRegnClickHandler}>
            <MdPersonAdd size={15} style={{ marginRight: "8px" }} /> New
            Registration
          </Button>
        )}
      </>
    );
  };

  const newRegnClickHandler = () => {
    navigate("/pages/registration");
  };

  const actionsHandler = (action, modalWidth, row) => {
    setSelectedPatient({
      action,
      data: row,
    });
    setShowDialog({
      show: true,
      rerender: false,
      modalWidth: modalWidth,
    });
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
        return (
          <Registration
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`${camelToTitle(
              selectedPatient?.action.toLocaleLowerCase()
            )} Registration`}
            selectedPatient={selectedPatient?.data}
            action={selectedPatient?.action}
            setShowDialog={setShowDialog}
          />
        );
      case "PATIENT_VITALS":
        return (
          <PatientVitals
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Patient Vitals`}
            selectedPatient={selectedPatient?.data}
            action={selectedPatient?.action}
            setShowDialog={setShowDialog}
          />
        );
      case "PATIENT_REGISTRATION_CARD":
        return (
          <PatientRegnCard
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Patient Registration Card`}
            selectedPatient={selectedPatient?.data}
            action={selectedPatient?.action}
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
        headerText="Patients"
        hideSearchBar
        html={<Buttons />}
        headerIcon={
          <IconWrapper
            icon={<FaUsers size={20} />}
            color={theme.palette.primary.main}
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
            {getDialogContent(selectedPatient.action)}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Patients;
