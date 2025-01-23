const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("../../middlewares/AsyncHandler");
const {
  getUserByUserId,
  createNewUser,
  getUserByUserPhone,
  lockUnlockUser,
  incrementIncorrectPwd,
  getRoleDataById,
} = require("./Service");

const login = asyncHandler(async (req, res) => {
  const { userId, userPassword } = req.body;
  const user = await getUserByUserId(userId);
  if (!user || user.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }
  const role = await getRoleDataById(user?.[0]?.roleId);
  if (user?.[0]?.incorrectPwdAttempts > 5) {
    await lockUnlockUser("LOCK", userId);
    return res
      .status(401)
      .json({ message: "User locked, please contact Administrator" });
  }

  if (!(await bcrypt.compare(userPassword, user?.[0]?.userPassword))) {
    await incrementIncorrectPwd(userId);
    return res.status(401).json({
      message: "Incorrect password",
      attemptsLeft: 6 - user?.[0]?.incorrectPwdAttempts,
    });
  }
  if (user?.[0]?.incorrectPwdAttempts >= 1) {
    await lockUnlockUser("UNLOCK", userId);
  }
  const duplicatedUser = JSON.parse(
    JSON.stringify({ ...user?.[0], ...role?.[0] })
  );
  delete duplicatedUser.userPassword;
  const token = jwt.sign(duplicatedUser, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.status(200).json({
    message: "User logged in successfully",
    data: duplicatedUser,
    token,
  });
});

const register = asyncHandler(async (req, res) => {
  const { userPhone, userPassword } = req.body;
  const existingUser = await getUserByUserPhone(userPhone);
  if (existingUser && existingUser.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }
  const pwd =
    userPassword !== null && userPassword !== undefined
      ? userPassword
      : "Simba@1234";
  const hashedPassword = await bcrypt.hash(pwd, 10);
  const payload = {
    ...req.body,
    userPassword: hashedPassword,
  };
  const newUser = await createNewUser(payload);
  const latestUser = await getUserByUserPhone(userPhone);
  delete latestUser?.[0]?.userPassword;
  res.status(201).json({
    message: "User registered successfully",
    data: latestUser?.[0],
  });
});

module.exports = {
  login,
  register,
};
