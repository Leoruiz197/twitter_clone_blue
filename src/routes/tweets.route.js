const router = require("express").Router();

const tweetController = require("../controller/tweets.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, tweetController.findAllTweetsController);
router.get("/search", authMiddleware, tweetController.searchTweetController);

router.post("/create", authMiddleware, tweetController.createTweetController);

router.patch("/:id/like", authMiddleware, tweetController.likeTweetController)
router.patch("/:id/retweet", authMiddleware, tweetController.retweetTweetController);
router.patch("/:id/comment", authMiddleware, tweetController.commentTweetController);

module.exports = router;