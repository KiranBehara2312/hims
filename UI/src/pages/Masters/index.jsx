import { Box, Button, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { postData } from "../../helpers/http";
import MyTable from "../../components/custom/MyTable";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaPlus } from "react-icons/fa";

const Masters = () => {
  const theme = useTheme();
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    if (!Array.isArray(selectedMenuCard?.collection)) {
      fetchMastersData({
        page: 1,
        limit: 10,
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
        totalCount: 1,
        defaultPage: 1,
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
        {MASTERS_ITEMS.map((x, i) => {
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
        })}
      </Stack>
    );
  };

  const getActionButtons = (action) => {
    const obj = {
      "Application Users": (
        <Button variant="outlined" size="small">
          <FaPlus size={15} style={{ marginRight: "8px" }} /> Add User
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
      {selectedMenuCard && (
        <Box sx={{ minWidth: "80%", maxWidth: "100%", overflowX: "auto" }}>
          <HeaderWithSearch
            headerText={selectedMenuCard.label}
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
                limit: 10,
              });
            }}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Masters;
