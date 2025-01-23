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
import { BsHypnotize } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import socketIOClient from "socket.io-client";
import { MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";
import { META } from "../../constants/projects";
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
import { postData } from "../../helpers/http";
import DynamicIcon from "./DynamicIcon";
import {
  setAllUsers,
  setGenderData,
  setMaritalStatus,
  setNotificationPriority,
  setOrgData,
  setSalutationData,
  setUserRoles,
} from "../../redux/slices/apiCacheSlice";

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
    {
      name: "Hypnotizer",
      privilege: "HYPNOTIZER",
      icon: <IconWrapper defaultColor icon={<BsHypnotize size={18} />} />,
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
  const [menuItems, setMenuItems] = useState([]);
  const [localOrgData, setLocalOrgData] = useState(null);
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
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const { DialogComponent, openDialog } = useConfirmation();

  const logoutHanlder = (confirmed) => {
    if (!confirmed) return;
    navigate("/auth/login");
    dispatch(emptyUserDetails());
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    loadMenuItems();
    loadCacheData();
    let inte = setInterval(() => {
      const dateWithTime = formatDate("DD MMM YYYY - hh:mm a");
      const day = WEEK_DAYS_LIST[new Date().getDay()]?.label;
      const currentURL = window.location.pathname.split("/pages/")[1];
      setSelectedMenuItem(`/pages/${currentURL}`);
      setCurrentDateTime(`${dateWithTime} | ${day}`);
    }, 1000);
    return () => {
      clearInterval(inte);
    };
  }, []);

  const loadMenuItems = async () => {
    const response = await postData("/init/menu", {});
    setMenuItems(response?.data ?? []);
  };

  const loadCacheData = async () => {
    try {
      const [res1, res2, res3, res4, res5, res6, res7] = await Promise.all([
        postData("/masters/data", { type: "gender" }),
        postData("/masters/data", { type: "salutation" }),
        postData("/masters/data", { type: "maritalStatus" }),
        postData("/init/orgData", {}),
        postData("/masters/data", { type: "roles" }),
        postData("/masters/data", { type: "notificationPriority" }),
        postData("/masters/data", { type: "allUsers" }),
      ]);

      dispatch(setGenderData(res1?.data ?? []));
      dispatch(setSalutationData(res2?.data ?? []));
      dispatch(setMaritalStatus(res3?.data ?? []));
      dispatch(setOrgData(res4?.data ?? []));
      dispatch(setUserRoles(res5?.data ?? []));
      dispatch(setNotificationPriority(res6?.data ?? []));
      dispatch(
        setAllUsers(
          res7?.data?.map((x) => {
            return {
              ...x,
              dropdownValue: x?.userId,
              dropdownLabel: x?.fullName,
            };
          }) ?? []
        )
      );

      setLocalOrgData(res4?.data ?? []);
    } catch (error) {
      console.error("Error loading menu items for cache:", error);
    }
  };

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
      case "HYPNOTIZER":
        return (
          <>
            <HeaderWithSearch
              hideSearchBar
              headerText={"Hypnotizer"}
              html={<CloseBtnHtml />}
            />
            <Box sx={{ overflow: "hidden" }}>
              <Box
                className="hypnotizer"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconWrapper defaultColor icon={<BsHypnotize size={500} />} />
              </Box>
            </Box>
          </>
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

  const handleClick = (label, url, isParent) => {
    if (isParent === 1) {
      setOpenMenu((prev) => (prev === label ? null : label));
    }
    if (url === null) return;
    routeChangeHandler(url);
  };

  const renderListItem = (item, level = 0) => {
    const { menuName, menuId, menuIcon, menuUrl, isParent, children } = item;
    const isOpen = openMenu === menuName;
    return (
      <>
        <ListItem
          key={menuId}
          disablePadding
          onClick={() => handleClick(menuName, menuUrl, isParent)}
          sx={{ pl: level * 2 }}
        >
          <ListItemButton
            sx={{
              background:
                selectedMenuItem === menuUrl
                  ? alpha(theme.palette.primary.main, 0.2)
                  : "",
            }}
          >
            <ListItemIcon>
              <IconWrapper
                icon={<DynamicIcon icon={menuIcon} />}
                color={
                  selectedMenuItem === menuUrl
                    ? theme.palette.primary.main
                    : null
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={{ fontSize: "0.5rem !important" }}
              primary={menuName}
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
          {menuItems?.map((item, index) => (
            <React.Fragment key={item.menuId}>
              {renderListItem(item)}
            </React.Fragment>
          ))}
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

  const getIconByRole = (icon, size = 75) => {
    const ICON_BY_ROLE = {
      FaUserCog: <FaUserCog size={size} />,
      FaUserDoctor: <FaUserDoctor size={size} />,
      FaUserAlt: <FaUserAlt size={size} />,
      FaUserNurse: <FaUserNurse size={size} />,
    };
    return ICON_BY_ROLE[icon];
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
            {localOrgData?.[0]?.orgName}
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
            {getIconByRole(loggedInUser?.iconName, 25)}
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
                icon={getIconByRole(loggedInUser?.iconName)}
                color={theme.palette.primary.main}
              />
            }
          />
          <MyHeading
            alignCenter
            sx={{ pt: 1 }}
            variant="h6"
            text={loggedInUser?.fullName}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <MyHeading alignCenter variant="caption" text={"Contact"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.userPhone}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}
          >
            <MyHeading alignCenter variant="caption" text={"User ID"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.userId}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}
          >
            <MyHeading alignCenter variant="caption" text={"Role"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.roleName}
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
