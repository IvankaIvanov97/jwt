const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

router.post("/auth", userController.auth);
router.post("/create", userController.create);

module.exports = router;
