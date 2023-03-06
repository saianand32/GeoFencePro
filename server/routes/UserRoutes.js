const router = require('express').Router();
const { signup, temp, login } = require('../controllers/authControllers')
const {createFenceController, getFenceController} = require('../controllers/FenceControllers')
const {getSafeStatusController, setSafeStatusController} = require('../controllers/safeStatusController')
const {validateConnectionController,generateKeyController, getConnectionStatusController, resetStatusController } = require('../controllers/ConnectionControllers')
const fetchuser = require('./middleware/FetchUser')


router.post("/signup", signup);
router.post("/login", login);
router.get("/temp", fetchuser, temp); //example of using middleware

router.get("/getFence", fetchuser, getFenceController);
router.post("/addFence", fetchuser, createFenceController);

router.get("/generateKey", fetchuser, generateKeyController);
router.get("/getConnectionStatus", fetchuser, getConnectionStatusController);
router.post("/validateConnection", fetchuser, validateConnectionController);
router.post("/resetStatus", fetchuser, resetStatusController);

router.get("/getSafeStatus", fetchuser, getSafeStatusController);
router.post("/setSafeStatus", fetchuser, setSafeStatusController);

module.exports = router;
