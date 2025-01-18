import moment from "moment";
import { toast } from "react-toastify";

import { S_USER_INFORMATION } from "../constants/sessionStorageKeys";

const formatDate = (formatStr = "dd/MM/yyyy", date = new Date()) => {
  return moment(date).format(formatStr);
};

const compareDate = (date1 = new Date(), date2 = new Date()) => {
  if (date1.getTime() < date2.getTime()) {
    return 1;
  } else if (date1.getTime() > date2.getTime()) {
    return -1;
  } else {
    return 0;
  }
};

const calculateAge = (birthDate = new Date()) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
  }
  return {
    years: years,
    months: months,
    days: days,
    string: `${years}y ${months}m ${days}d`,
  };
};
function addDaysToCurrentDate(daysToAdd = 0) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  return currentDate;
}

const convertMongoDBDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

const camelToTitle = (camelCaseString) => {
  // Add a space before each uppercase letter and capitalize the first letter of each word
  const titleCaseString = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return titleCaseString;
};

const setUserInfoInSStorage = (userObj) => {
  sessionStorage.setItem(S_USER_INFORMATION, JSON.stringify(userObj));
};

const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem(S_USER_INFORMATION));
};

const errorAlert = (
  message = "This is default message",
  options = { autoClose: 1500, pauseOnFocusLoss: true }
) =>
  toast.error(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const successAlert = (
  message = "This is default message",
  options = { autoClose: 1500, pauseOnFocusLoss: false }
) =>
  toast.success(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const infoAlert = (
  message = "This is default message",
  options = { autoClose: 1500, pauseOnFocusLoss: false }
) =>
  toast.info(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const warnAlert = (
  message = "This is default message",
  options = { autoClose: 1500, pauseOnFocusLoss: false }
) =>
  toast.warn(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const defaultAlert = (
  message = "This is default message",
  options = { autoClose: 1500, pauseOnFocusLoss: false }
) =>
  toast(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });

function convertAmountIntoWords(price) {
  var sglDigit = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ],
    dblDigit = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ],
    tensPlace = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ],
    handle_tens = function (dgt, prevDgt) {
      return 0 == dgt
        ? ""
        : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (
        (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") +
        (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      );
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (((price += ""), isNaN(parseInt(price)))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (
        ((digit = price[digitIdx] - 0),
        (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
        price.length - digitIdx - 1)
      ) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " Hundred" +
                  (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                    ? " and"
                    : "")
              : ""
          );
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " Hundred" +
                  (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                    ? " and"
                    : " Crore")
              : ""
          );
      }
    str = words.reverse().join("") + " rupees only";
  } else str = "";
  return str;
}

export {
  formatDate,
  setUserInfoInSStorage,
  getUserInfo,
  errorAlert,
  defaultAlert,
  warnAlert,
  successAlert,
  infoAlert,
  camelToTitle,
  convertMongoDBDate,
  calculateAge,
  addDaysToCurrentDate,
  compareDate,
  convertAmountIntoWords,
};
