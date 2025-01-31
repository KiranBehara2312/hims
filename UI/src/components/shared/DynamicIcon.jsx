import React from "react";
import {
  MdPersonAdd,
  MdHome,
  MdSettings,
  MdSearch,
  MdCalendarMonth,
} from "react-icons/md";
import { FaRegMoneyBill1, FaUserDoctor } from "react-icons/fa6";
import {
  FaCalendarAlt,
  FaDharmachakra,
  FaHandHoldingUsd,
  FaSearchengin,
  FaServicestack,
  FaUsers,
} from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

const ICON_MAP = {
  MdPersonAdd: MdPersonAdd,
  MdHome: MdHome,
  MdCalendarMonth: MdCalendarMonth,
  FaRegMoneyBill1: FaRegMoneyBill1,
  FaUserDoctor: FaUserDoctor,
  FaServicestack: FaServicestack,
  FaDharmachakra: FaDharmachakra,
  FaHandHoldingUsd: FaHandHoldingUsd,
  FaSearchengin: FaSearchengin,
  FaCalendarAlt: FaCalendarAlt,
  FaUsers: FaUsers,
  SiCashapp: SiCashapp,
};

const DynamicIcon = ({ icon, size = '1.25rem', defaultColor, color = null }) => {
  const IconComponent = ICON_MAP[icon];
  if (!IconComponent) {
    return <MdHome size={size} color={color} />;
  }
  return <IconComponent size={size} />;
};

export default DynamicIcon;
