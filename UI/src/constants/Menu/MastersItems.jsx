import {
  FaAddressCard,
  FaCashRegister,
  FaHandshake,
  FaPeopleArrows,
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

const MASTERS_ITEMS = [
  {
    label: "State",
    collection: "states",
    icon: <HiMiniBuildingLibrary size={25} />,
    category: null,
  },
  {
    label: "Application Users",
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
    collection: GENDER_LIST,
    icon: <FaTransgenderAlt size={25} />,
    category: null,
  },
  {
    label: "Blood Groups",
    collection: BLOOD_GROUPS,
    icon: <MdBloodtype size={25} />,
    category: null,
  },
  {
    label: "Marital Status",
    collection: MARITAL_STATUS,
    icon: <FaPeopleArrows size={25} />,
    category: null,
  },
  {
    label: "Doctor Designations",
    collection: DOCTOR_DESIGNATIONS,
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
    collection: SALUTATIONS,
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
    label: "App user Types",
    collection: APP_USER_TYPES,
    icon: <FaUsersCog size={25} />,
    category: null,
  },
  {
    label: "Appointment Booking Status",
    collection: APPOINTMENT_BOOKING_STATUS,
    icon: <VscTypeHierarchy size={25} />,
    category: null,
  },
];

export { MASTERS_ITEMS };
