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
import { NOTIFICATION_PRIORITY } from "../../../constants/localDB/MastersDB";

const DEFAULT_VAL = {
  header: "",
  message: "",
  priority: "",
  sentOn: "",
  sentBy: "",
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

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      sentBy: loggedInUser?.userName,
      sentByName: loggedInUser?.firstName + " " + loggedInUser?.lastName,
      sentOn: formatDate("DD/MM/YYYY hh:mm a"),
    };
    const reposnse = await postData("/notifications/add", payload);
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

      <GlassBG cardStyles={{ marginTop: "50px" }}>
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
          <F_Select
            name="priority"
            control={control}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Notification priority is required",
              },
            }}
            list={NOTIFICATION_PRIORITY}
            label="Notification Priority"
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
