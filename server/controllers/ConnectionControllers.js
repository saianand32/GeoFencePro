const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const { generateAuthKey } = require('../utils/utils')

module.exports.generateKeyController = async (req, res, next) => {
  try {
    const username = req.user.username
    const user = await User.findOne({ username });
    const authKey = generateAuthKey();
    const secureAuthKey = await bcrypt.hash(authKey, 10)
    if (user) {
      await User.updateOne({ username }, {$set:{connectionKey: { key: secureAuthKey, isValid: false }}});
      res.json({ status: true, connectionKey:authKey, msg: "generated Key successfully"});
    }
    else{
      res.json({status:false, msg: "server Error"})
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.validateConnectionController = async (req, res, next) => {
  try {
    const connectionKey = req.body.connectionKey
    const username = req.user.username
    const user = await User.findOne({ username });

    if(user){
        const isValid = await bcrypt.compare(connectionKey, user.connectionKey.key)
        if(isValid){
          await User.updateOne({ username }, {$set:{connectionKey: { key: user.connectionKey.key, isValid: true }}});
          res.json({status:true, msg:"verified connection"})
        }
        
            
        else
            res.json({status:false, msg:"unauthorized"})
    }
    else
        res.json({status:false, msg:"unauthorized"})

  } catch (ex) {
    next(ex);
  }
};


module.exports.getConnectionStatusController = async (req, res, next) => {
  try {
    const username = req.user.username
    const user = await User.findOne({ username });

    if(user){
          const isValid = user.connectionKey.isValid
          if(isValid){
            res.json({status:true, msg:"connection status true"})
          }
          else{
            res.json({status:false, msg:"connection status false"})
          }
          
    }
    else
        res.json({status:false, msg:"unauthorized"})

  } catch (ex) {
    next(ex);
  }
};

module.exports.resetStatusController = async (req, res, next) => {
  try {
    const username = req.user.username
    const user = await User.findOne({ username });

    if(user){
            await User.updateOne({ username }, {$set:{connectionKey: { key: user.connectionKey.key, isValid: false }}});
            res.json({status:true, msg:"connection status back to false"})
          }
          
    else
        res.json({status:false, msg:"unauthorized"})

  } catch (ex) {
    next(ex);
  }
};
