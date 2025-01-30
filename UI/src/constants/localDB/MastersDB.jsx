const WEEK_DAYS_LIST = [
  {
    label: "Sunday",
    value: "Sunday",
    shortName: "Sun",
  },
  {
    label: "Monday",
    value: "Monday",
    shortName: "Mon",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
    shortName: "Tue",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
    shortName: "Wed",
  },
  {
    label: "Thursday",
    value: "Thursday",
    shortName: "Thu",
  },
  {
    label: "Friday",
    value: "Friday",
    shortName: "Fri",
  },
  {
    label: "Saturday",
    value: "Saturday",
    shortName: "Sat",
  },
];

const PAYMENT_TYPES = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "UPI",
    value: "UPI",
  },
  // {
  //   label: "Coupon",
  //   value: "Coupon",
  // },
];

const APPOINTMENT_BOOKING_STATUS = [
  {
    label: "Free",
    value: "Free",
    code: "ABS001",
    color: "#078307", // Bright Green
  },
  {
    label: "Hold",
    value: "Hold",
    code: "ABS003",
    color: "#bd702c", // Bright Yellow
  },
  {
    label: "Booked",
    value: "Booked",
    code: "ABS004",
    color: "#0e0e93", // Bright Blue
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    code: "ABS005",
    color: "#a71111", // Bright Red
  },
  {
    label: "Rescheduled",
    value: "Rescheduled",
    code: "ABS006",
    color: "#800080", // Bright Purple
  },
  {
    label: "Completed",
    value: "Completed",
    code: "ABS007",
    color: "#0997cf", // Bright Green
  },
  {
    label: "No Show",
    value: "No Show",
    code: "ABS008",
    color: "#55474a", // Bright Pink
  },
];

const PAYMENT_STATUSES = [
  {
    label: "Success",
    value: "Success",
  },
  {
    label: "Failure",
    value: "Failure",
  },
  {
    label: "Pending",
    value: "Pending",
  },
];

const APPT_SOURCE_TYPES = [
  {
    label: "Call Center",
    value: "Call Center",
  },
  {
    label: "Direct Walkin",
    value: "Direct Walkin",
  },
  {
    label: "Telephone",
    value: "Telephone",
  },
];
const APPT_VISIT_FOR = [
  {
    label: "Consultation",
    value: "Consultation",
  },
  {
    label: "Counselling",
    value: "Counselling",
  },
  {
    label: "Cross Consultation",
    value: "Cross Consultation",
  },
  {
    label: "Dressing",
    value: "Dressing",
  },
  {
    label: "Opinion",
    value: "Opinion",
  },
  {
    label: "Review with reports",
    value: "Review with reports",
  },
  {
    label: "Second Opinion",
    value: "Second Opinion",
  },
];

export {
  WEEK_DAYS_LIST,
  PAYMENT_TYPES,
  PAYMENT_STATUSES,
  APPOINTMENT_BOOKING_STATUS,
  APPT_VISIT_FOR,
  APPT_SOURCE_TYPES,
};
