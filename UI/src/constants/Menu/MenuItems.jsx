import {
  FaBed,
  FaCalendarAlt,
  FaDharmachakra,
  FaHome,
  FaIdCard,
  FaSearchengin,
  FaUsers,
} from "react-icons/fa";
import { MdPersonAdd, MdCalendarMonth } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { FaHandHoldingUsd } from "react-icons/fa";

import { ADMIN, DOCTOR, NURSE, STAFF } from "../roles";

const MENU_ITEMS = [
  {
    label: "New Registration",
    icon: <MdPersonAdd size={20} />,
    url: "registration",
    children: [],
    access: [ADMIN, STAFF],
  },
  {
    label: "New Appointment",
    icon: <MdCalendarMonth size={20} />,
    url: "appointment",
    children: [],
    access: [ADMIN, STAFF],
  },
  {
    label: "Service Billing",
    icon: <FaHandHoldingUsd size={20} />,
    url: "serviceBilling",
    children: [],
    access: [ADMIN, STAFF],
  },
  {
    label: "Payment Ledger",
    icon: <SiCashapp size={20} />,
    url: "paymentLedger",
    children: [],
    access: [ADMIN, STAFF],
  },
  {
    label: "Doctor",
    icon: <FaUserDoctor size={20} />,
    url: "doctor",
    children: [],
    access: [ADMIN, STAFF],
  },
  {
    label: "Tracking",
    icon: <FaSearchengin size={20} />,
    url: null,
    children: [
      {
        label: "Appointments",
        icon: <FaCalendarAlt size={20} />,
        url: "tracking/allAppointments",
        access: [ADMIN, STAFF],
      },
      {
        label: "Patients",
        icon: <FaUsers size={20} />,
        url: "tracking/patients",
        children: [],
        access: [ADMIN, NURSE, STAFF, DOCTOR],
      },
    ],
    access: [ADMIN, STAFF],
  },

  {
    label: "Masters",
    icon: <FaDharmachakra size={20} />,
    url: "masters",
    children: [],
    access: [ADMIN],
  },
];

export { MENU_ITEMS };
