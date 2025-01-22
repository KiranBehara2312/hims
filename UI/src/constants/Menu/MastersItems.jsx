import {
  FaAddressCard,
  FaCashRegister,
  FaHandshake,
  FaPeopleArrows,
  FaServicestack,
  FaTransgenderAlt,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import { IoMaleFemale } from "react-icons/io5";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { VscTypeHierarchy } from "react-icons/vsc";
import { MdBloodtype, MdOutlineAccessTimeFilled } from "react-icons/md";
import {
  APP_USER_TYPES,
  APPOINTMENT_BOOKING_STATUS,
  BLOOD_GROUPS,
  DAILY_SHIFT,
  DOCTOR_DESIGNATIONS,
  GENDER_LIST,
  MARITAL_STATUS,
  PATIENT_TYPES,
  PAYMENT_TYPES,
  SALUTATIONS,
} from "../localDB/MastersDB";
import { SERVICE_LOCATIONS } from "../localDB/PaymentServices";
import { FaLocationDot } from "react-icons/fa6";

const MASTERS_ITEMS = [
  {
    label: "State",
    collection: "allStates",
    icon: <HiMiniBuildingLibrary size={25} />,
    category: null,
  },
  {
    label: "Users",
    collection: "users",
    icon: <FaUsers size={25} />,
    category: null,
  },
  {
    label: "Country",
    collection: "countries",
    icon: <BsGlobeCentralSouthAsia size={25} />,
    category: null,
  },
  {
    label: "Patient Type",
    collection: PATIENT_TYPES,
    icon: <VscTypeHierarchy size={25} />,
    category: null,
  },
  {
    label: "Genders",
    collection: "gender",
    icon: <FaTransgenderAlt size={25} />,
    category: null,
  },
  {
    label: "Blood Groups",
    collection: "bloodGroup",
    icon: <MdBloodtype size={25} />,
    category: null,
  },
  {
    label: "Marital Status",
    collection: "maritalStatus",
    icon: <FaPeopleArrows size={25} />,
    category: null,
  },
  {
    label: "Doctor Designations",
    collection: "doctorDesignation",
    icon: <FaAddressCard size={25} />,
    category: null,
  },
  {
    label: "Shifts",
    collection: DAILY_SHIFT,
    icon: <MdOutlineAccessTimeFilled size={25} />,
    category: null,
  },
  {
    label: "Salutations",
    collection: "salutation",
    icon: <FaHandshake size={25} />,
    category: null,
  },
  {
    label: "Payment Types",
    collection: PAYMENT_TYPES,
    icon: <FaCashRegister size={25} />,
    category: null,
  },
  {
    label: "Roles",
    collection: "roles",
    icon: <FaUsersCog size={25} />,
    category: null,
  },
  {
    label: "Appointment Booking Status",
    collection: "apptStatus",
    icon: <VscTypeHierarchy size={25} />,
    category: null,
  },
  {
    label: "Payment Service Locations",
    collection: SERVICE_LOCATIONS,
    icon: <FaLocationDot size={25} />,
    category: null,
  },
  {
    label: "Payment Services",
    collection: "paymentServices",
    icon: <FaServicestack size={25} />,
    category: null,
  },
];

export { MASTERS_ITEMS };
