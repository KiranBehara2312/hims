import { useState, useEffect } from "react";
import { warnAlert } from "../helpers";

const useNotification = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [requestingPermission, setRequestingPermission] = useState(false);

  useEffect(() => {
    if (permission === "default" && !requestingPermission) {
      setRequestingPermission(true);
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        setRequestingPermission(false);
      });
    }
  }, [permission, requestingPermission]);

  const sendBrowserNotification = (title, options = {}) => {
    if (permission === "granted") {
      new Notification(title, options);
    } else {
      warnAlert("Notification permission is not granted!");
    }
  };

  return { sendBrowserNotification, permission };
};

export default useNotification;
