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
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { ADMIN, STAFF } from "../../constants/roles";
import { useSelector } from "react-redux";
import { camelToTitle } from "../../helpers";
import WorkInProgress from "../../components/shared/WorkInProgress";
import { useNavigate } from "react-router-dom";

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

];
const AllAppointments = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
      <Button
        variant="outlined"
        size="small"
        onClick={() => navigate("/pages/appointment")}
      >
        <FaPlus size={15} style={{ marginRight: "8px" }} /> New Appointment
      </Button>
    );
  };
  const fetchDoctors = async (paginationObj) => {
    const response = await postData(
      `/appointment/allAppointments`,
      paginationObj
    );
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
        headerText="All Appointments"
        hideSearchBar
        html={<Buttons />}
        headerIcon={
          <IconWrapper
            icon={
              <FaCalendarCheck size={20} color={theme.palette.primary.main} />
            }
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

export default AllAppointments;
