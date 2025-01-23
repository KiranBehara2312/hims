import { Box, Button } from "@mui/material";
import React from "react";
import HeaderWithSearch from "../../custom/HeaderWithSearch";
import IconWrapper from "../../custom/IconWrapper";
import { AiFillMessage } from "react-icons/ai";
import { useForm } from "react-hook-form";
import F_Input from "../../custom/form/F_Input";
import { GlassBG } from "../../custom";
import F_Select from "../../custom/form/F_Select";
import { postData } from "../../../helpers/http";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers";
import {
  c_allUsers,
  c_notificationPriority,
} from "../../../redux/slices/apiCacheSlice";
import F_Autocomplete from "../../custom/form/F_AutoComplete";

const DEFAULT_VAL = {
  header: "",
  message: "",
  priority: "",
  sentOn: "",
  sentBy: "",
  taggedUserId: "",
  url: "",
};

const SendNotification = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Send Notification",
  action = null,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VAL,
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const cachedNotiPriority = useSelector(c_notificationPriority);
  const cachedAllUsers = useSelector(c_allUsers);
  const onSubmit = async ({
    header,
    message,
    priority,
    sentOn,
    sentBy,
    taggedUserId,
    url,
  }) => {
    const newPayload = {
      ntfCode: null,
      ntfHeader: header,
      ntfMessage: message,
      ntfIsRead: 0,
      ntfPriorityCode: priority,
      ntfSentOn: formatDate("YYYY-MM-DD hh:mm:ss"),
      ntfSentById: loggedInUser?.userId,
      ntfUrl: url,
      ntfIsUserTagged: taggedUserId?.length > 0 ? 1 : 0,
      ntfTaggedUserId: taggedUserId,
    };
    const reposnse = await postData("/notification/create", newPayload);
    setShowDialog({
      show: false,
      rerender: false,
      modalWidth: "xs",
    });
  };
  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<AiFillMessage size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />

      <GlassBG cardStyles={{ mt: -1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <F_Input
            name="header"
            control={control}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Notification Header is required",
              },
              maxLength: {
                value: 50,
                message: "Maximum length exceeded",
              },
            }}
            label="Notification Header"
          />
          <F_Input
            name="message"
            control={control}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Notification Message is required",
              },
              maxLength: {
                value: 500,
                message: "Maximum length exceeded",
              },
            }}
            maxRows={3}
            multiline
            label="Notification Message"
          />
          <F_Autocomplete
            name="priority"
            control={control}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Notification priority is required",
              },
            }}
            list={cachedNotiPriority}
            label="Notification Priority"
          />
          <F_Autocomplete
            name="taggedUserId"
            control={control}
            errors={errors}
            rules={{}}
            list={cachedAllUsers?.filter(
              (x) => x.dropdownValue !== loggedInUser?.userId
            )}
            label="Tag another user"
          />
          <F_Input
            name="url"
            control={control}
            errors={errors}
            rules={{}}
            label="URL"
          />

          <Button
            variant="outlined"
            fullWidth
            size="small"
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Notification
          </Button>
        </form>
      </GlassBG>
    </>
  );
};

export default SendNotification;
