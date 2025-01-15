const PatientRegn = require("../../models/PatientRegn");
const PaymentLedger = require("../../models/PaymentLedger");

const PatRegnController = {
  generateUHID: () => {
    return new Promise((resolve, reject) => {
      PatientRegn.findOne()
        .sort({ _id: -1 })
        .then((lastUser) => {
          let lastUserUHIDCount = +lastUser?.UHID?.split("D")[1] + 1;
          if (isNaN(lastUserUHIDCount)) {
            lastUserUHIDCount = "1";
          }
          const uid = `UHID${lastUserUHIDCount.toString().padStart(6, "0")}`;
          resolve(uid);
        })
        .catch((error) => {
          console.error("Error while generating UHID", error);
          reject(error);
        });
    });
  },
  generatePatientNo: () => {
    return new Promise((resolve, reject) => {
      PatientRegn.findOne()
        .sort({ _id: -1 })
        .then((lastUser) => {
          let lastUserPatCount = +lastUser?.patientNo?.split("T")[1] + 1;
          if (isNaN(lastUserPatCount)) {
            lastUserPatCount = "1";
          }
          const uid = `PAT${lastUserPatCount.toString().padStart(6, "0")}`;
          resolve(uid);
        })
        .catch((error) => {
          console.error("Error while generating Patient No", error);
          reject(error);
        });
    });
  },
  insertPayments: async (payments, newUHID) => {
    try {
      const lastPayment = await PaymentLedger.findOne().sort({ _id: -1 });

      let lastBillNo = 1;
      if (lastPayment && lastPayment.billNo) {
        lastBillNo = +lastPayment.billNo.split("LL")[1] + 1;
      }
      const paymentDocs = await Promise.all(
        payments.map((x, index) => {
          const newBillNo = `BILL${(lastBillNo + index)
            .toString()
            .padStart(8, "0")}`;

          const newBill = {
            UHID: newUHID,
            billNo: newBillNo,
            ...x,
          };

          return newBill;
        })
      );
      // Insert all payment documents at once using insertMany
      await PaymentLedger.insertMany(paymentDocs);

      console.log("All payments inserted successfully!");
    } catch (error) {
      console.error("Error inserting payments:", error);
    }
  },
};

module.exports = PatRegnController;
