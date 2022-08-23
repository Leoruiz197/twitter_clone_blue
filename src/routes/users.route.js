const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get("/findAll", userController.findAllUserController);
router.get("/findByEmail", userController.findByEmailUserController);

router.post("/create", userController.createUserController);

module.exports = router;