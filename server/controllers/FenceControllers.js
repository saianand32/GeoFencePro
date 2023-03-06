const UserFence = require("../models/UserFence");

module.exports.createFenceController = async (req, res, next) => {
  try {
    const { fenceLat, fenceLon } = req.body;
    const user = req.user.id;

    const fence = await UserFence.findOne({ user });

    if (fence) {
      await UserFence.updateOne({ user }, {$set:{user,fenceLat,fenceLon,isSafe:true}});
    } else {
      await UserFence.create({ user, fenceLat, fenceLon, isSafe:true });
    }

    res.json({ status: true, msg: "fence created"});
  } catch (ex) {
    next(ex);
  }
};

module.exports.getFenceController = async (req, res, next) => {
  try {
    const user = req.user.id;

    const fence = await UserFence.findOne({ user });

    if (fence) res.json({ status: true, fence });
    else res.json({ status: false, msg: "no fence exists" });
  } catch (ex) {
    next(ex);
  }
};
