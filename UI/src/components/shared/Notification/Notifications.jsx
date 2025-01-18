import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Pagination,
  Popover,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { GlassBG, MyHeading } from "../../custom";
import IconWrapper from "../../custom/IconWrapper";
import { IoNotificationsSharp } from "react-icons/io5";
import { postData } from "../../../helpers/http";
import HeaderWithSearch from "../../custom/HeaderWithSearch";
import NoDataFound from "../NoDataFound";
import { MdNotificationImportant } from "react-icons/md";
import { grey, orange, pink, red, yellow } from "@mui/material/colors";

const LIMIT = 5;
const Notifications = ({ setNotificationDialog = () => {} }) => {
  const [notifications, setNotifications] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (page = 1) => {
    const response = await postData("/notifications/all", {
      page: page,
      limit: LIMIT,
    });
    setNotifications(response ?? []);
  };

  const paginationChangeHandler = (event, newPage) => {
    fetchNotifications(newPage);
  };

  const closeDialog = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setNotificationDialog(false);
  };

  const getColorBasedOnPriority = (priority) => {
    const COLOR_OBJ = {
      CATASTROPHIC: red[500],
      HIGH: red[500],
      MEDIUM: orange[500],
      LOW: grey[500],
      NORMAL: theme.palette.primary.main,
    };
    return COLOR_OBJ[priority.toString().toUpperCase()];
  };

  return (
    <Dialog open={true} onClose={closeDialog} maxWidth="md" fullWidth>
      <DialogContent sx={{ m: 1 }}>
        <HeaderWithSearch
          hideSearchBar
          notScrollable
          headerIcon={
            <IconWrapper
              defaultColor
              icon={<IoNotificationsSharp size={20} />}
            />
          }
          headerText={"Notifications"}
          html={
            <>
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
            </>
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            margin: "0px 2px",
          }}
        >
          {notifications?.data?.length === 0 && <NoDataFound />}
          {notifications?.data?.map((x) => {
            return (
              <GlassBG>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <MyHeading variant="caption" text={x.header} />
                  <span
                    style={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <MyHeading variant="caption" text={x.priority} />
                    {x.priority === "Catastrophic" && (
                      <IconWrapper
                        color={getColorBasedOnPriority(x.priority)}
                        icon={<MdNotificationImportant size={20} />}
                      />
                    )}
                    <IconWrapper
                      color={getColorBasedOnPriority(x.priority)}
                      icon={<MdNotificationImportant size={20} />}
                    />
                  </span>
                </Box>
                <MyHeading variant="body2" text={x.message} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <MyHeading
                    variant="caption"
                    sx={{ fontSize: "11px" }}
                    text={`${x.sentByName} (${x.sentBy})`}
                  />
                  <MyHeading
                    variant="caption"
                    sx={{ fontSize: "11px" }}
                    text={`${x.sentOn}`}
                  />
                </Box>
              </GlassBG>
            );
          })}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              sx={{ m: 1, float: "right" }}
              variant="outlined"
              color="primary"
              size="small"
              shape="rounded"
              count={notifications?.totalPages}
              defaultPage={notifications?.page}
              onChange={paginationChangeHandler}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;
