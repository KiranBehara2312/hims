import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";
import Communication from "./Details/Communication";
import { useForm } from "react-hook-form";
import Doctor from "./Details/Doctor";
import Payment from "./Details/Payment";
import Primary from "./Details/Primary";
import { errorAlert, formatDate, successAlert } from "../../helpers";
import { postData } from "../../helpers/http";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useConfirmation from "../../hooks/useConfirmation";
import PDFGenerator from "../../components/pdf/PDFGenerator";
import BillReceiptTemplate from "../../components/pdf/templates/BillReceipt";
import { NEVER_CHANGING_VALS } from "../../constants/localDB/neverChanging";
import { MdPersonAdd } from "react-icons/md";

// {
//   "UHID": null,
//   "patientNo": null,
//   "patientType": "PATTYPE01",
//   "patientCategory": "PATCAT002",
//   "registrationDate": "06/02/2025 18:31",
//   "addressLineOne": "kNkj",
//   "addressLineTwo": "",
//   "alternateMobileNo": "",
//   "bloodGroup": "BLDG001",
//   "contactNumber": "8823723972",
//   "dateOfBirth": "1987-01-10",
//   "doctorDepartment": "DEPT0026",
//   "doctor": "DOC0001",
//   "firstName": "Test",
//   "gender": "GEND001",
//   "lastName": "Test",
//   "maritalStatus": "MRTL001",
//   "salutation": "SAL0001",
//   "middleName": "Test",
//   "payeeName": "VivaMed Diagnostics",
//   "paymentType": "PAYTYPE003",
//   "pinCode": "540021",
//   "registrationType": "",
//   "state": "STAT0001",
//   "transactionId": "",
//   "doctorConsultationFee": "1250.00",
//   "visitType": "VISTYP02",
//   "paymentStatus": "Success",
//   "knownusBy": "KNUS0008",
//   "disableType": "DIS0001",
//   "idType": "UID0001",
//   "idNo": "Testtv",
//   "whatsAppNo": "8823723972",
//   "country": "COUN0007",
//   "nextOfKinName": "Neq test",
//   "kinRelation": "KINR006",
//   "kinContactNo": "8293848294",
//   "isMlc": true,
//   "sponsorGroup": "SPGR000001",
//   "sponsor": "SPON000008",
//   "sponsorName": "VivaMed Diagnostics",
//   "payments": [
//     {
//       "serviceAmount": "100.00",
//       "serviceName": "UHID Fee",
//       "discountAppliedinPercent": 0,
//       "payeeName": "VivaMed Diagnostics",
//       "paymentType": "PAYTYPE003",
//       "transactionId": "",
//       "paymentDate": "06/02/2025 06:31:46"
//     },
//     {
//       "serviceAmount": "350.00",
//       "serviceName": "Registration Charges - IP",
//       "discountAppliedinPercent": 0,
//       "payeeName": "VivaMed Diagnostics",
//       "paymentType": "PAYTYPE003",
//       "transactionId": "",
//       "paymentDate": "06/02/2025 06:31:46"
//     }
//   ]
// }


const DEFAULT_VAL = {
  UHID: "",
  patientType: NEVER_CHANGING_VALS.PAT_TYPE_OP,
  patientCategory: NEVER_CHANGING_VALS.PAT_CAT_GENERAL,
  registrationDate: formatDate("DD/MM/YYYY HH:mm"),
  country: NEVER_CHANGING_VALS.COUNTRY_CODE_INDIA,
  addressLineOne: "",
  addressLineTwo: "",
  alternateMobileNo: "",
  bloodGroup: "",
  contactNumber: "",
  dateOfBirth: "",
  doctorDepartment: "",
  doctor: "",
  firstName: "",
  gender: "",
  lastName: "",
  maritalStatus: "",
  salutation: "",
  middleName: "",
  patientNo: "",
  payeeName: "",
  paymentType: "",
  pinCode: "",
  registrationType: "",
  state: "",
  transactionId: "",
  doctorConsultationFee: 0,
  visitType: "",
  paymentStatus: "",
  knownusBy: "",
  disableType: "",
  idType: "",
  idNo: "",
  whatsAppNo: "",
  nextOfKinName: "",
  kinRelation: "",
  kinContactNo: "",
  isMlc: false,
};

const Registration = ({
  dialogCloseBtn = null,
  headerText = "Registration",
  selectedPatient = null,
  action = null,
  setShowDialog = () => {},
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { DialogComponent, openDialog } = useConfirmation();
  const [paymentChargeDetails, setPaymentChargeDetails] = useState([]);
  const loggedInUser = useSelector((state) => state?.userDetails?.user);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VAL,
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();

  useEffect(() => {
    if (selectedPatient !== null) return;
    const interval = setInterval(() => {
      setValue("registrationDate", formatDate("DD/MM/YYYY HH:mm"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [selectedPatient]);

  useEffect(() => {
    if (selectedPatient !== null) {
      Object.entries(selectedPatient)?.map(([key, val], index) => {
        setValue(key, val, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      });
    }
  }, [selectedPatient]);

  const resetForm = () => {
    reset(DEFAULT_VAL);
  };

  const getPaymentDetails = (formData) => {
    const paymentDate = formatDate("DD/MM/YYYY hh:mm:ss");
    let finalPaymentDetails = [];
    if (paymentChargeDetails?.length > 0) {
      paymentChargeDetails?.map((x) => {
        if (x.serviceName !== "Total") {
          finalPaymentDetails.push({
            serviceAmount: x.serviceAmount,
            serviceName: x.serviceName,
            serviceCode: x.serviceCode,
            serviceLocation: x.serviceLocation,
            discountAppliedinPercent: 0,
            payeeName: formData.payeeName,
            paymentType: formData.paymentType,
            transactionId: formData.transactionId,
            paymentDate,
          });
        }
      });
    }
    return finalPaymentDetails;
  };

  const onSubmit = async (formData) => {
    const payments = getPaymentDetails(formData);
    if (payments?.length === 0) {
      return errorAlert("Payment Details are empty", { autoClose: 1500 });
    }
    const payload = {
      ...formData,
      payments: payments,
    };
    console.log(payload);
    const response = await postData("/registration/create", payload);
    openDialog({
      message: `${response?.message} \n UHID \t\t ${response?.UHID} \n Patient No ${response?.patientNo}`,
      confirmCallback: afterRegHandler,
      justDisplayModal: true,
      component: (
        <PDFGenerator
          document={
            <BillReceiptTemplate
              pdfName="Bill Receipt"
              billsArray={response?.insertedPayments}
              UHID={response?.UHID ?? null}
              payeeDetails={response?.insertedPayments?.[0]}
            />
          }
          fileName="Bill_Receipt.pdf"
        />
      ),
    });
  };

  const afterRegHandler = (confirmed) => {
    if (!confirmed) return;
    resetForm();
    navigate("/pages/tracking/patients");
  };

  const onUpdate = async (formData) => {
    const response = await postData(
      `/registration/update/${selectedPatient?.UHID}`,
      formData
    );
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit(action === "EDIT" ? onUpdate : onSubmit)}
          style={{ width: "100%" }}
        >
          <HeaderWithSearch
            headerText={headerText}
            hideSearchBar
            headerIcon={
              <IconWrapper
                icon={
                  <MdPersonAdd
                    size={"1.15rem"}
                    color={theme.palette.primary.main}
                  />
                }
              />
            }
            html={
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                {action !== "VIEW" && (
                  <>
                    <Button size="small" type="submit" variant="outlined">
                      Submit
                    </Button>
                    <Button
                      size="small"
                      type="button"
                      variant="outlined"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </>
                )}
                {dialogCloseBtn}
              </Box>
            }
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              height: "calc(100vh - 120px)",
              overflow: "auto",
              gap: 2,
              pb: 1,
            }}
          >
            <Primary
              control={control}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
              readOnly={action}
            />
            <Personal
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action === "VIEW"}
            />
            <Communication
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action === "VIEW"}
              setValue={setValue}
            />
            <Doctor
              control={control}
              errors={errors}
              formValues={formValues}
              getValues={getValues}
              readOnly={action === "VIEW" || action === "EDIT"}
              setValue={setValue}
            />
            {selectedPatient === null && (
              <Payment
                control={control}
                errors={errors}
                formValues={formValues}
                setValue={setValue}
                setPaymentChargeDetails={setPaymentChargeDetails}
              />
            )}
          </Box>
        </form>
      </Box>
      {DialogComponent}
    </>
  );
};

export default Registration;
