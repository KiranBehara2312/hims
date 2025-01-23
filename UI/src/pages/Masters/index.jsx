import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { postData } from "../../helpers/http";
import MyTable from "../../components/custom/MyTable";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaPlus, FaUserPlus } from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";
import PaymentService from "./AddEdits/PaymentService";
import WorkInProgress from "../../components/shared/WorkInProgress";
import ApplicationUser from "./AddEdits/AppUser";
import Grid from "@mui/material/Grid2";

const LIMIT = 10;
const Masters = () => {
  const theme = useTheme();
  const [masterSearchVal, setMasterSearchVal] = useState("");
  const [masterItems, setMasterItems] = useState(
    MASTERS_ITEMS.sort((a, b) => a.label.localeCompare(b.label))
  );
  const [component, setComponent] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalRecords: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    isServerSidePagination: true,
  });

  useEffect(() => {
    if (!showDialog.show) {
      setSelectedAction(null);
    }
  }, [showDialog.show]);

  useEffect(() => {
    fetchMastersData({
      page: 1,
      limit: LIMIT,
    });
  }, [showDialog.rerender]);

  useEffect(() => {
    if (selectedAction === null) return;
    setComponent(actionClickHandler(selectedAction));
    setShowDialog({ rerender: false, show: true });
    return () => {
      setSelectedAction(null);
    };
  }, [selectedAction]);

  useEffect(() => {
    if (masterSearchVal !== "") {
      searchMasterItemHanlder();
    } else {
      setMasterItems(
        MASTERS_ITEMS.sort((a, b) => a.label.localeCompare(b.label))
      );
    }
  }, [masterSearchVal]);

  const actionClickHandler = (action) => {
    switch (action) {
      case "ADD_SERVICE_AGAINST_LOCATION":
        return (
          <PaymentService
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`New Payment Service`}
            selectedRow={null}
            action={"ADD_SERVICE_AGAINST_LOCATION"}
            setShowDialog={setShowDialog}
          />
        );
      case "ADD_USER":
        return (
          <ApplicationUser
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Add Application User`}
            selectedRow={null}
            action={"ADD_USER"}
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

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedAction(null);
  };

  useEffect(() => {
    if (!Array.isArray(selectedMenuCard?.collection)) {
      fetchMastersData({
        page: 1,
        limit: LIMIT,
      });
    } else {
      const oneObj = selectedMenuCard?.collection?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 170,
            colorCoded: x === "color",
          };
        }),
        data: selectedMenuCard?.collection ?? [],
        totalPages: Math.ceil(selectedMenuCard?.collection?.length / LIMIT),
        currentPage: 1,
        totalRecords: selectedMenuCard?.collection?.length,
        pageSize: LIMIT,
        isServerSidePagination: false,
      });
    }
  }, [selectedMenuCard]);

  const fetchMastersData = async (paginationObj) => {
    const response = await postData(`/masters/data`, {
      ...paginationObj,
      type: selectedMenuCard.collection,
    });
    if (response) {
      const oneObj = response?.data?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            colorCoded: x === "color",
            id: x,
            label: x,
            minWidth: 170,
            type: x === "createdAt" || x === "updatedAt" ? "date" : "string",
          };
        }),
        data: response?.data ?? [],
        ...response?.pagination,
      });
    } else {
      setTableObj(() => {
        return {
          columns: [],
          data: [],
          totalPages: 0,
          currentPage: 0,
          totalRecords: 0,
          pageSize: 0,
          isServerSidePagination: true,
        };
      });
    }
  };

  const searchMasterItemHanlder = () => {
    const filteredItems = MASTERS_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(masterSearchVal)
    );
    setMasterItems(filteredItems);
  };

  const MasterItemsJsx = () => {
    return (
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          justifyContent: "space-between",
        }}
      >
        <TextField
          size="small"
          label="Search Master"
          variant="outlined"
          fullWidth
          autoFocus
          value={masterSearchVal}
          onChange={(e) => setMasterSearchVal(e.target.value)}
          sx={{ mt: 1 }}
        />
        {masterItems?.length === 0 && <NoDataFound sx={{ mt: 20 }} />}
        <Grid container spacing={1}>
          {masterItems?.map((x, i) => {
            return (
              <Grid size={6}>
                <Box onClick={() => setSelectedMenuCard(x)} key={i}>
                  <GlassBG
                    cardStyles={{
                      height: "40px",
                      cursor: "pointer",
                    }}
                  >
                    <MyHeading
                      text={
                        <IconWrapper
                          icon={x.icon}
                          color={
                            selectedMenuCard === x
                              ? theme.palette.primary.main
                              : null
                          }
                        />
                      }
                      alignCenter
                      variant="body1"
                    />
                    <MyHeading
                      text={
                        x.label?.length > 20 ? (
                          <marquee scrollamount={2}>{x.label}</marquee>
                        ) : (
                          x.label
                        )
                      }
                      alignCenter
                      variant="caption"
                    />
                  </GlassBG>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    );
  };

  // get the action buttons which are present in the header above the table
  const getActionButtons = (action) => {
    const obj = {
      Users: (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSelectedAction("ADD_USER")}
        >
          <FaUserPlus size={15} style={{ marginRight: "8px" }} /> Add User
        </Button>
      ),
      "Payment Services": (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSelectedAction("ADD_SERVICE_AGAINST_LOCATION")}
        >
          <FaPlus size={15} style={{ marginRight: "8px" }} /> Add Service
        </Button>
      ),
    };
    return obj[action] ?? null;
  };

  return (
    <Grid container spacing={1}>
      <Grid size={3}>
        <MasterItemsJsx />
      </Grid>
      <Grid size={9}>
        {selectedMenuCard === null && <NoDataFound sx={{ mt: 20 }} />}
        {selectedMenuCard && (
          <Box sx={{ overflowX: "auto" }}>
            <HeaderWithSearch
              headerText={selectedMenuCard.label}
              hideSearchBar
              headerIcon={
                <IconWrapper
                  icon={selectedMenuCard.icon}
                  color={theme.palette.primary.main}
                />
              }
              html={getActionButtons(selectedMenuCard.label)}
            />
            <MyTable
              {...tableObj}
              changedPage={(newPage) => {
                fetchMastersData({
                  page: newPage,
                  limit: LIMIT,
                });
              }}
            />
          </Box>
        )}
      </Grid>
      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>{component}</DialogContent>
        </Dialog>
      )}
    </Grid>
  );
};

export default Masters;
