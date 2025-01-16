import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { postData } from "../../helpers/http";
import MyTable from "../../components/custom/MyTable";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaPlus } from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";
import PaymentService from "./AddEdits/PaymentService";
import WorkInProgress from "../../components/shared/WorkInProgress";

const LIMIT = 10;
const Masters = () => {
  const theme = useTheme();
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
    totalCount: 0,
    defaultPage: 0,
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
        totalCount: Math.ceil(selectedMenuCard?.collection?.length / LIMIT),
        defaultPage: 1,
        isServerSidePagination: false,
      });
    }
  }, [selectedMenuCard]);

  const fetchMastersData = async (paginationObj) => {
    const response = await postData(
      `/masters/${selectedMenuCard.collection}`,
      paginationObj
    );
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
        totalCount: response?.totalPages || 0,
        defaultPage: response?.page || 0,
        isServerSidePagination: true,
      });
    } else {
      setTableObj({
        columns: [],
        data: [],
        totalCount: 0,
        isServerSidePagination: true,
        defaultPage: 0,
      });
    }
  };

  const MasterItems = () => {
    return (
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          justifyContent: "space-around",
        }}
      >
        {MASTERS_ITEMS.sort((a, b) => a.label.localeCompare(b.label)).map(
          (x, i) => {
            return (
              <Box onClick={() => setSelectedMenuCard(x)} key={i}>
                <GlassBG
                  cardStyles={{
                    height: "40px",
                    cursor: "pointer",
                    minWidth: "95px",
                    maxWidth: "95px",
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
                      x.label?.length > 15 ? (
                        <marquee scrollamount={3}>{x.label}</marquee>
                      ) : (
                        x.label
                      )
                    }
                    alignCenter
                    variant="caption"
                  />
                </GlassBG>
              </Box>
            );
          }
        )}
      </Stack>
    );
  };

  const getActionButtons = (action) => {
    const obj = {
      "Application Users": (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSelectedAction("ADD_USER")}
        >
          <FaPlus size={15} style={{ marginRight: "8px" }} /> Add User
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
    <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
      <Box
        sx={{
          height: "calc(100vh - 55px)",
          overflowY: "auto",
          maxWidth: "20%",
        }}
      >
        <MasterItems />
      </Box>
      {selectedMenuCard === null && <NoDataFound sx={{ mt: 20 }} />}
      {selectedMenuCard && (
        <Box sx={{ minWidth: "80%", maxWidth: "100%", overflowX: "auto" }}>
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
      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>{component}</DialogContent>
        </Dialog>
      )}
    </Stack>
  );
};

export default Masters;
