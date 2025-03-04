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
  Collapse,
  Badge,
  Dialog,
  DialogContent,
} from "@mui/material";
import { IoNotificationsSharp } from "react-icons/io5";
import socketIOClient from "socket.io-client";
import { MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";
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
import { FaHome, FaUserAlt, FaUserCog, FaUserNurse } from "react-icons/fa";
import MyHeading from "../custom/MyHeading";
import { FaUserDoctor } from "react-icons/fa6";
import { formatDate } from "../../helpers";
import { WEEK_DAYS_LIST } from "../../constants/localDB/MastersDB";
import Notifications from "./Notification/Notifications";
import { MdMore } from "react-icons/md";
import { ADMIN, DOCTOR, NURSE, STAFF } from "../../constants/roles";
import { TbReport } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import SendNotification from "./Notification/SendNotification";
import HeaderWithSearch from "../custom/HeaderWithSearch";
import WorkInProgress from "./WorkInProgress";
import MyTooltip from "./MyTootlip";

const MyHeader = () => {
  const MORE_ACTIONS = [
    {
      name: "Send Notifications",
      privilege: "SEND_NOTIFICATION",
      icon: <IconWrapper defaultColor icon={<AiFillMessage size={18} />} />,
      disabled: false,
      access: [ADMIN, STAFF, NURSE, DOCTOR],
      modalWidth: "xs",
    },
    {
      name: "Reports",
      privilege: "REPORTS",
      icon: <IconWrapper defaultColor icon={<TbReport size={18} />} />,
      disabled: false,
      access: [ADMIN, STAFF, NURSE, DOCTOR],
      modalWidth: "md",
    },
  ];

  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedMoreAction, setSelectedMoreAction] = useState(null);
  const [notificationDialog, setNotificationDialog] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreActionsEl, setMoreActionsEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [showNotiBadge, setShowNotiBadge] = useState(false);
  const dispatch = useDispatch();
  const [autoLogoutMsg, setAutoLogoutMsg] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const { DialogComponent, openDialog } = useConfirmation();

  // const socket = socketIOClient("http://localhost:3000");

  // useEffect(() => {
  //   setTimeout(() => {
  //     socket.on("notificationCount", (count) => {
  //       setShowNotiBadge(true);
  //     });

  //     return () => {
  //       socket.disconnect();
  //       setShowNotiBadge(false);
  //     };
  //   }, 3000);
  // }, []);

  const logoutHanlder = (confirmed) => {
    if (!confirmed) return;
    navigate("/auth/login");
    dispatch(emptyUserDetails());
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    let inte = setInterval(() => {
      const dateWithTime = formatDate("DD MMM YYYY - hh:mm a");
      const day = WEEK_DAYS_LIST[new Date().getDay()]?.label;
      const currentURL = window.location.pathname.split("/pages/")[1];
      setSelectedMenuItem(currentURL);
      setCurrentDateTime(`${dateWithTime} | ${day}`);
    }, 1000);
    return () => {
      clearInterval(inte);
    };
  }, []);

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedMoreAction(null);
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
      case "SEND_NOTIFICATION":
        return (
          <SendNotification
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Send Notification`}
            action={selectedMoreAction}
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

  const handleClick = (label, url) => {
    setOpenMenu((prev) => (prev === label ? null : label));
    if (url === null) return;
    routeChangeHandler(url);
  };

  const renderListItem = (item, level = 0) => {
    const { label, icon, url, children } = item;
    const isOpen = openMenu === label;
    return (
      <>
        <ListItem
          key={label}
          disablePadding
          onClick={() => handleClick(label, url)}
          sx={{ pl: level * 2 }}
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
                  selectedMenuItem === url ? theme.palette.primary.main : null
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={{ fontSize: "0.5rem !important" }}
              primary={label}
            />
            {children?.length > 0 &&
              (openMenu ? <MdExpandLess /> : <MdExpandMore />)}
          </ListItemButton>
        </ListItem>

        {children?.length > 0 && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List>
              {children.map((childItem) =>
                renderListItem(childItem, level + 1)
              )}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  const DrawerList = () => {
    const FILTERED_ITEMS_BY_ROLE = MENU_ITEMS.filter((item) =>
      item.access.includes(loggedInUser?.role)
    );
    return (
      <Box
        sx={{ width: 300, display: "flex", flexDirection: "column" }}
        role="presentation"
      >
        <Box sx={{ m: 1, maxHeight: "50px" }}>
          <HospitalDetailsLogo />
        </Box>
        <Divider />

        <List sx={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
          {FILTERED_ITEMS_BY_ROLE.map(
            ({ label, icon, url, children }, index) => (
              <React.Fragment key={label}>
                {renderListItem({ label, icon, url, children })}
              </React.Fragment>
            )
          )}
        </List>
      </Box>
    );
  };

  const routeChangeHandler = (url) => {
    if (url === null) return;
    navigate(url);
    setSelectedMenuItem(url);
    setOpen(false);
  };

  const accountClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const moreActionClickHandler = (event) => {
    setMoreActionsEl(event.currentTarget);
  };

  const moreActionOptionClickHandler = (action, modalWidth) => {
    setSelectedMoreAction(action);
    setShowDialog({
      show: true,
      rerender: false,
      modalWidth: modalWidth,
    });
    setMoreActionsEl(null);
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

          <MyHeading variant="body2" text={currentDateTime} sx={{ pr: 1 }} />

          <IconButton color="inherit" onClick={() => navigate("/pages/home")}>
            <FaHome size={20} />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => setNotificationDialog(true)}
          >
            <Badge
              color="secondary"
              variant={showNotiBadge ? "dot" : "standard"}
            >
              <IoNotificationsSharp size={20} />
            </Badge>
          </IconButton>

          <MyTooltip title="More Actions">
            <IconButton color="inherit" onClick={moreActionClickHandler}>
              <MdMore size={20} />
            </IconButton>
          </MyTooltip>

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
                openDialog({
                  message: "Are you sure you want to logout?",
                  confirmCallback: logoutHanlder,
                })
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

      <Popover
        open={Boolean(moreActionsEl)}
        anchorEl={moreActionsEl}
        onClose={() => setMoreActionsEl(null)}
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
            minWidth: "200px",
          }}
        >
          {/* <MyHeading
            alignCenter
            text="More Actions"
            variant="body1"
          /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            {MORE_ACTIONS?.map((x, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "120px",
                    width: "200px",
                    maxWidth: "370px",
                    m: 1,
                    cursor: x.disabled ? "no-drop" : "pointer",
                    opacity: x.disabled ? 0.2 : 1,
                    pointerEvents: x.disabled ? "none" : "all",
                  }}
                  onClick={() =>
                    moreActionOptionClickHandler(x.privilege, x.modalWidth)
                  }
                >
                  <span style={{ flexBasis: "15%" }}>{x.icon}</span>
                  <MyHeading variant="body2" text={x.name} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Popover>

      {notificationDialog && (
        <Notifications setNotificationDialog={setNotificationDialog} />
      )}

      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>
            {getDialogContent(selectedMoreAction)}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MyHeader;
