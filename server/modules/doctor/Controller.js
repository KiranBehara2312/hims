const asyncHandler = require("../../middlewares/AsyncHandler");
const { createNewUser, getUserByUserPhone } = require("../auth/Service");
const { upsertDoctor, getAllDoctorsFromDB } = require("./Service");
const bcrypt = require("bcrypt");

const getAllDocs = asyncHandler(async (req, res) => {
  const { page, limit } = req.body;
  const result = await getAllDoctorsFromDB(page, limit);
  res.status(200).json({
    message: "Doctor's fetched successfully",
    ...result,
  });
});

const upsertDoc = asyncHandler(async (req, res) => {
  const loggedInUser = req.loggedInUser;
  const {
    doctorId = null,
    orgId,
    firstName,
    middleName,
    lastName,
    fullName,
    dateOfBirth,
    gender,
    contactNumber,
    alternateMobileNo,
    designation,
    department,
    specialization,
    qualification,
    medicalLicenseNumber,
    shiftTimings,
    availableDays,
    slotTimeInMin,
    fee,
    starRating = 0,
    isActive = 1,
    isBlocked = 0,
    isOrgDoctor = 0,
  } = req.body;
  const payload = {
    doctorId,
    orgId,
    firstName,
    middleName,
    lastName,
    dateOfBirth: new Date(dateOfBirth),
    gender,
    contactNumber,
    alternateMobileNo,
    designation,
    department,
    specialization,
    qualification,
    medicalLicenseNumber,
    shiftTimings,
    availableDays: `${JSON.stringify(availableDays)}`,
    slotTimeInMin,
    fee,
    starRating,
    isActive,
    isBlocked,
    isOrgDoctor,
  };

  const hashedPassword = await bcrypt.hash("Simba@1234", 10);
  const userPayload = {
    userId: null,
    orgId: orgId,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    fullName: `Dr. ${firstName} ${middleName} ${lastName}`,
    userPhone: contactNumber,
    roleId: "RID0004",
    userAadhar: "",
    isActive: 1,
    isBlocked: 0,
    isLocked: 0,
    userPassword: hashedPassword,
    incorrectPwdAttempts: 0,
  };
  const existingUser = await getUserByUserPhone(contactNumber);
  if (existingUser && existingUser.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }
  const userResult = await createNewUser({
    ...userPayload,
    createdBy: loggedInUser?.userId,
  });
  const latestUser = await getUserByUserPhone(contactNumber);
  const result = await upsertDoctor(
    Object.values({
      ...payload,
      userId: latestUser?.[0]?.userId,
      createdBy:
        doctorId === null ? loggedInUser?.userId : req?.body?.createdBy,
      updatedBy: doctorId !== null ? loggedInUser?.userId : null,
    })
  );
  res.status(200).json({
    message: "Doctor saved successfully",
    data: result,
  });
});

module.exports = {
  upsertDoc,
  getAllDocs,
};
