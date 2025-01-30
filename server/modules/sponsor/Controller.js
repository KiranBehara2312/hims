const asyncHandler = require("../../middlewares/AsyncHandler");
const { sponsorBySpnGrp } = require("./Service");

const sponsorBySponsorGroupId = asyncHandler(async (req, res) => {
  const { sponsorGroupId } = req.body;
  const result = await sponsorBySpnGrp(sponsorGroupId);
  res.status(200).json({
    message: `Sponsors fetched successfully against sponsor group`,
    ...result,
  });
});

module.exports = {
  sponsorBySponsorGroupId,
};
