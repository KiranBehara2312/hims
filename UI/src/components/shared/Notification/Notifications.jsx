import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Pagination,
  Popover,
  Avatar,
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
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers";
import {
  c_notificationPriority,
  c_allUsers,
  c_userRoles,
} from "../../../redux/slices/apiCacheSlice";
import MyTooltip from "../MyTootlip";

const LIMIT = 5;
const Notifications = ({ setNotificationDialog = () => {} }) => {
  const [notifications, setNotifications] = useState([]);
  const cachedNotiPriority = useSelector(c_notificationPriority);
  const cachedAllUsers = useSelector(c_allUsers);
  const cacheduserRoles = useSelector(c_userRoles);
  const theme = useTheme();
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (page = 1) => {
    const response = await postData("/notification/all", {
      page: page,
      limit: LIMIT,
    });
    setNotifications(response?.data ?? []);
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

  const GetPriorityCardDetails = ({ pri = "PRI0005" }) => {
    const priority = cachedNotiPriority?.find((x) => x.priorityId === pri)?.priorityName;
    return <MyHeading variant="rem065" text={priority} />;
  };

  const getColorBasedOnPriority = (priority) => {
    const COLOR_OBJ = {
      PRI0001: red[500],
      PRI0002: red[500],
      PRI0003: orange[500],
      PRI0004: grey[500],
      PRI0005: grey[500],
    };
    return COLOR_OBJ[priority.toString().toUpperCase()];
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const getUserBgColor = (userID) => {
    const role = cachedAllUsers?.find((x) => x.userId === userID)?.roleId;
    let color = cacheduserRoles?.find((x) => x.roleId === role)?.color;
    return color;
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
          {notifications?.length === 0 && <NoDataFound />}
          {notifications?.map((x) => {
            return (
              <GlassBG>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <MyHeading variant="rem085" text={x.ntfHeader} />
                  <span
                    style={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <IconWrapper
                      color={getColorBasedOnPriority(x.ntfPriorityCode)}
                      icon={<MdNotificationImportant size={20} />}
                    />
                    {<GetPriorityCardDetails pri={x.ntfPriorityCode} />}
                    {x.ntfTaggedUserId !== null && (
                      <>
                        <MyTooltip
                          title={`${x.ntfTaggedUserName} (${x.ntfTaggedUserId}) was tagged`}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 24,
                              height: 24,
                              ml: 1,
                              fontSize: "10px",
                              background: getUserBgColor(x.ntfTaggedUserId),
                            }}
                            {...stringAvatar(x.ntfTaggedUserName)}
                          />
                        </MyTooltip>
                      </>
                    )}
                  </span>
                </Box>
                <MyHeading variant="rem075" text={x.ntfMessage} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <MyHeading
                    variant="rem055"
                    text={`Sent by: ${x.ntfSentByName} (${x.ntfSentById})`}
                  />
                  <MyHeading
                    variant="rem055"
                    text={`Sent on: ${formatDate(
                      "DD/MM/YYYY hh:mm a",
                      new Date(x.ntfSentOn)
                    )}`}
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
