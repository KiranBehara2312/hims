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

const convertTo24HourFormat = (timeString) => {
  const date = new Date(`1970-01-01T${timeString}:00Z`);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
};

const convertTo12HourFormat = (time) => {
  // time = "2024-12-25T14:30:00";
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesFormatted} ${ampm}`;
};

module.exports = { calculateAge, convertTo24HourFormat, convertTo12HourFormat };
