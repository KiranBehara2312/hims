import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  useTheme,
  alpha,
  Popover,
  Button,
} from "@mui/material";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { META } from "../../constants/projects";
import { MENU_ITEMS } from "../../constants/Menu/MenuItems";
import { useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import useConfirmation from "../../hooks/useConfirmation";
import IconWrapper from "../custom/IconWrapper";
import HospitalDetailsLogo from "./HospitalDetailsLogo";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserDetails } from "../../redux/slices/userDetailsSlice";
import { FaUserAlt, FaUserCog, FaUserNurse } from "react-icons/fa";
import MyHeading from "../custom/MyHeading";
import { FaUserDoctor } from "react-icons/fa6";
import { compareDate, formatDate, infoAlert } from "../../helpers";
import { WEEK_DAYS_LIST } from "../../constants/localDB/MastersDB";
import moment from "moment";

const MyHeader = () => {
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [autoLogoutMsg, setAutoLogoutMsg] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const { DialogComponent, openDialog } = useConfirmation();

  const logoutHanlder = (confirmed) => {
    if (!confirmed) return;
    navigate("/auth/login");
    dispatch(emptyUserDetails());
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    let countdownInterval = setInterval(function () {
      const targetDate = moment(loggedInUser?.exp);
      let currentTime = moment();
      let remainingTime = targetDate.diff(currentTime);
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        return;
      }
      let duration = moment.duration(remainingTime);
      let days = duration.days();
      let hours = duration.hours();
      let minutes = duration.minutes();
      let seconds = duration.seconds();
      if (minutes === 0 && seconds === 59) {
        infoAlert(
          "Your session will end in 1 min, please save your changes...!",
          { autoClose: 5000 }
        );
      }
      if (minutes === 0 && seconds == 3) {
        infoAlert("Logging out...!", { autoClose: 2000 });
      }
      if (minutes === 0 && seconds === 1) logoutHanlder();
      setAutoLogoutMsg(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    let inte = setInterval(() => {
      const dateWithTime = formatDate("DD MMM YYYY - hh:mm");
      const day = WEEK_DAYS_LIST[new Date().getDay()]?.label;
      const currentURL = window.location.pathname.split("/pages/")[1];
      setSelectedMenuItem(currentURL);
      setCurrentDateTime(`${dateWithTime} | ${day}`);
    }, 1000);
    return () => {
      clearInterval(inte);
    };
  }, []);

  const DrawerList = () => {
    const FILTERED_ITEMS_BY_ROLE = MENU_ITEMS.filter((item) =>
      item.access.includes(loggedInUser?.role)
    );
    return (
      <Box
        sx={{ width: 250, display: "flex", flexDirection: "column" }}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <Box sx={{ m: 1 }}>
          <HospitalDetailsLogo />
        </Box>
        <Divider />

        <List sx={{ height: "calc(98.8vh - 125px)", overflowY: "auto" }}>
          {FILTERED_ITEMS_BY_ROLE.map(({ label, icon, url }, index) => (
            <ListItem
              key={label}
              disablePadding
              onClick={() => routeChangeHandler(url)}
            >
              <ListItemButton
                sx={{
                  background:
                    selectedMenuItem === url
                      ? alpha(theme.palette.primary.main, 0.2)
                      : "",
                }}
              >
                <ListItemIcon>
                  <IconWrapper
                    icon={icon}
                    color={
                      selectedMenuItem === url
                        ? theme.palette.primary.main
                        : null
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem
          disablePadding
          onClick={() =>
            openDialog("Are you sure you want to logout?", logoutHanlder)
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <IconWrapper
                icon={
                  <IoLogOutSharp size={20} color={theme.palette.primary.main} />
                }
              />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </Box>
    );
  };

  const routeChangeHandler = (url) => {
    navigate(url);
    setSelectedMenuItem(url);
  };

  const accountClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getIconByRole = (role = "STAFF", size = 75) => {
    const ICON_BY_ROLE = {
      ADMIN: <FaUserCog size={size} />,
      DOCTOR: <FaUserDoctor size={size} />,
      STAFF: <FaUserAlt size={size} />,
      NURSE: <FaUserNurse size={size} />,
    };
    return ICON_BY_ROLE[role];
  };

  return (
    <>
      <AppBar position="static" sx={{ height: "40px" }}>
        <Toolbar sx={{ minHeight: "40px !important", height: "40px" }}>
          <MdMenu
            size={30}
            style={{
              paddingRight: "15px",
              marginLeft: "-10px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {META.PROJECT_TITLE}
          </Typography>

          <MyHeading
            variant="body2"
            text={currentDateTime}
            sx={{ pr: 1}}
          />
          <IconButton color="inherit" onClick={accountClickHandler}>
            {getIconByRole(loggedInUser?.role, 25)}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerList />
      </Drawer>
      {DialogComponent}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            m: 1,
            pt: 2,
            minWidth: "250px",
          }}
        >
          <MyHeading
            alignCenter
            text={
              <IconWrapper
                icon={getIconByRole(loggedInUser?.role)}
                color={theme.palette.primary.main}
              />
            }
          />
          <MyHeading
            alignCenter
            sx={{ pt: 1 }}
            variant="h6"
            text={`${loggedInUser?.role === "DOCTOR" ? "Dr." : ""} ${
              loggedInUser?.firstName
            } ${loggedInUser?.lastName}`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <MyHeading alignCenter variant="caption" text={"User Name"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.userName}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}
          >
            <MyHeading alignCenter variant="caption" text={"Role"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.role}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 0.5,
              pb: 1,
            }}
          >
            <MyHeading alignCenter variant="caption" text={"Last Login at"} />
            <MyHeading alignCenter variant="caption" text={loggedInUser?.iat} />
          </Box>
          <Divider />
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              pt: 1,
              cursor: "pointer",
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              size="small"
              onClick={() =>
                openDialog("Are you sure you want to logout?", logoutHanlder)
              }
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <IconWrapper
                icon={
                  <IoLogOutSharp
                    size={20}
                    style={{ paddingRight: "10px", paddingTop: "5px" }}
                    color={theme.palette.primary.main}
                  />
                }
              />
              Logout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 1, display: "flex", justifyContent: "flex-start" }}
            >
              <IconWrapper
                icon={
                  <IoIosMail
                    size={20}
                    style={{ paddingRight: "10px", paddingTop: "5px" }}
                    color={theme.palette.primary.main}
                  />
                }
              />
              Issues / Feedback
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default MyHeader;
