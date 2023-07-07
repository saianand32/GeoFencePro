const UserFence = require("../models/UserFence");

module.exports.setSafeStatusController = async (req, res, next) => {
  try {
    const { setStatus } = req.body;
    const user = req.user.id;

    const fence = await UserFence.findOne({ user });

    if (fence) {
      if (setStatus != fence.isSafe)
        await UserFence.updateOne(
          { user },
          { $set: { isSafe: setStatus } }
        );
      res.json({ status: true, msg: `fence status set to ${Boolean(setStatus)}`, liveLocStatus: setStatus });
    } else {
      res.json({ status: false, msg: "no fence exists" });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getSafeStatusController = async (req, res, next) => {
  try {
    const user = req.user.id;

    const fence = await UserFence.findOne({ user });

    if (fence) {
      res.json({
        status: true,
        safeStatus: fence.isSafe,
        msg: `sent status successfully`,
      });
    } else {
      res.json({ status: false, msg: "no fence exists" });
    }
  } catch (ex) {
    next(ex);
  }
};
