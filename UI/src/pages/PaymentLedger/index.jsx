import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { Box, Button, useTheme } from "@mui/material";
import { FaEdit, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";
import { useForm } from "react-hook-form";
import F_Select from "../../components/custom/form/F_Select";
import { SERVICE_LOCATIONS } from "../../constants/localDB/PaymentServices";
import NoDataFound from "../../components/shared/NoDataFound";

const LIMIT = 10;
const ACTIONS = [
  {
    name: "Edit",
    icon: <IconWrapper icon={<FaEdit size={15} />} />,
    disabled: false,
  },
  {
    name: "View",
    icon: <IconWrapper icon={<FaEye size={15} />} />,
    disabled: false,
  },
  {
    name: "Delete",
    icon: <IconWrapper icon={<FaTrash size={15} />} />,
    disabled: true,
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
  };

  const Buttons = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mr: 18,
            alignItems: "center",
          }}
        >
          <F_Select
            control={control}
            name={"serviceLocation"}
            label={"Service Location"}
            list={[{ label: "All", value: "All" }, ...SERVICE_LOCATIONS]}
            rules={{}}
            maxWidth="140px"
            isRequired={true}
            errors={errors}
          />
          <Button
            variant="outlined"
            size="small"
            type="submit"
            sx={{ height: "30px" }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={addDoctorHandler}
            sx={{ height: "30px" }}
          >
            <FaPrint size={15} style={{ marginRight: "8px" }} /> Print
          </Button>
        </Box>
      </form>
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
    </>
  );
};

export default PaymentLedger;
