import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { Alert, Box, Button, Popover, useTheme } from "@mui/material";
import { FaEdit, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";
import { useForm } from "react-hook-form";
import F_Select from "../../components/custom/form/F_Select";
import { SERVICE_LOCATIONS } from "../../constants/localDB/PaymentServices";
import NoDataFound from "../../components/shared/NoDataFound";
import F_Autocomplete from "../../components/custom/form/F_AutoComplete";
import { MyHeading } from "../../components/custom";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { ADMIN, STAFF } from "../../constants/roles";

const LIMIT = 10;
const ACTIONS = [
  {
    name: "Edit",
    privilege: "EDIT",
    icon: <IconWrapper defaultColor icon={<FaEdit size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
];
const PaymentLedger = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { serviceLocation: "All" },
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();
  const [anchorPosition, setAnchorPosition] = useState(null);

  const [showAddDoc, setShowAddDoc] = useState({
    show: false,
    rerender: false,
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
    fetchPaymentLedgers({
      page: 1,
      limit: LIMIT,
      serviceLocation: formValues?.serviceLocation,
    });
  }, [showAddDoc.rerender]);

  const onSubmit = ({ serviceLocation }) => {
    fetchPaymentLedgers({
      page: 1,
      limit: LIMIT,
      serviceLocation: serviceLocation,
    });
    setAnchorPosition(null);
  };

  const showServiceLocationSelector = (event) => {
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };

  const Buttons = () => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={(event) => showServiceLocationSelector(event)}
        >
          <FaLocationDot size={15} style={{ marginRight: "8px" }} /> Service
          Location
        </Button>
        <Button variant="outlined" size="small" onClick={addDoctorHandler}>
          <FaPrint size={15} style={{ marginRight: "8px" }} /> Print
        </Button>
      </Box>
    );
  };
  const fetchPaymentLedgers = async (paginationObj) => {
    const response = await postData(`/paymentledger/history`, {
      ...paginationObj,
      serviceLocation: formValues?.serviceLocation,
    });
    if (response) {
      const oneObj = response?.data?.[0];
      if (!oneObj) {
        setTableObj({
          columns: [],
          data: [],
          totalCount: 0,
          defaultPage: 0,
        });
        return;
      }
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
      action: "Add",
      data: null,
    });
    setShowAddDoc({
      show: true,
      rerender: false,
    });
  };

  const actionsHandler = (action, row) => {
    setSelectedDoc({
      action,
      data: row,
    });
    setShowAddDoc({
      show: true,
      rerender: false,
    });
  };
  return (
    <>
      <HeaderWithSearch
        headerText="Payment Ledger"
        hideSearchBar
        html={<Buttons />}
        headerIcon={
          <IconWrapper
            icon={<SiCashapp size={20} />}
            color={theme.palette.primary.main}
          />
        }
      />
      {tableObj.columns?.length > 0 && (
        <MyTable
          {...tableObj}
          helperNote={"Note: Right click on a record to view actions"}
          actions={ACTIONS}
          actionWithRecord={actionsHandler}
          changedPage={(newPage) => {
            fetchPaymentLedgers({
              page: newPage,
              limit: LIMIT,
            });
          }}
        />
      )}
      {tableObj.columns?.length === 0 && <NoDataFound />}

      {Boolean(anchorPosition) && (
        <Popover
          open={true}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          onClose={() => setAnchorPosition(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                minWidth: "350px",
                maxWidth: "350px",
              }}
            >
              <MyHeading alignCenter variant="body1" text="Service Location" />
              <F_Autocomplete
                control={control}
                name={"serviceLocation"}
                label={"Service Location"}
                list={[{ label: "All", value: "All" }, ...SERVICE_LOCATIONS]}
                rules={{}}
                maxWidth="140px"
                isRequired={true}
                errors={errors}
              />
              <Button variant="outlined" size="small" fullWidth type="submit">
                Search
              </Button>
              <Alert severity="info" sx={{ mt: 2 }}>
                Service Location is the place where the payment gets completed,
                filter according to the location and then use the print option
              </Alert>
            </Box>
          </form>
        </Popover>
      )}
    </>
  );
};

export default PaymentLedger;
