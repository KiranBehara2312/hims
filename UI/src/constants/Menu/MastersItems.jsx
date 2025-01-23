import {
  FaAddressCard,
  FaBuilding,
  FaCashRegister,
  FaHandshake,
  FaPeopleArrows,
  FaServicestack,
  FaTransgenderAlt,
  FaUserGraduate,
  FaUsers,
  FaUsersCog,
  FaWheelchair,
} from "react-icons/fa";
import { IoMaleFemale } from "react-icons/io5";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { VscTypeHierarchy } from "react-icons/vsc";
import {
  MdBloodtype,
  MdNotificationImportant,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { GiPlayerTime } from "react-icons/gi";
import { PATIENT_TYPES, PAYMENT_TYPES } from "../localDB/MastersDB";
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
    collection: "patientTypes",
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
    label: "Salutations",
    collection: "salutation",
    icon: <FaHandshake size={25} />,
    category: null,
  },
  {
    label: "Payment Types",
    collection: "paymentType",
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
  {
    label: "Notification Priority",
    collection: "notificationPriority",
    icon: <MdNotificationImportant size={25} />,
    category: null,
  },
  {
    label: "Doctor Qualififcation",
    collection: "doctorQualifications",
    icon: <FaUserGraduate size={25} />,
    category: null,
  },
  {
    label: "Organisation Shifts",
    collection: "orgShifts",
    icon: <GiPlayerTime size={25} />,
    category: null,
  },
  {
    label: "Patient Category",
    collection: "patientCategory",
    icon: <FaArrowsDownToPeople size={25} />,
    category: null,
  },
  {
    label: "Disability Status",
    collection: "disabilityStatus",
    icon: <FaWheelchair size={25} />,
    category: null,
  },
  {
    label: "Doctor Departments",
    collection: "doctorDepartments",
    icon: <FaBuilding size={25} />,
    category: null,
  },
];

export { MASTERS_ITEMS };
