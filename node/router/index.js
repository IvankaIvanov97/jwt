const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

router.post("/auth", userController.auth);
router.post("/create", userController.create);
router.get("/refresh", userController.updateToken);
router.get("/chech", userController.chechToken);

module.exports = router;
