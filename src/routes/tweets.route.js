const router = require("express").Router();

const tweetController = require("../controller/tweets.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, tweetController.findAllTweetsController);
router.get("/search", authMiddleware, tweetController.searchTweetController);

router.post("/create", authMiddleware, tweetController.createTweetController);

module.exports = router;