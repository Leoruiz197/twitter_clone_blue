const Tweet = require("../models/Tweet");

const createTweetService = (message, userId) => Tweet.create({message, user:userId});

const findAllTweetsService = (offset, limit) => 
Tweet.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const searchTweetService = (message) =>
  Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user")

const likesService = (id, userId) => Tweet.findOneAndUpdate(
  {
    _id: id,
    "likes.userId": { $nin: [userId]}
  },
  {
    $push: {
      likes: { userId, created: new Date() }
    }
  },
  {
    rawResult: true,
  },
);

const dislikesService = (id, userId) => Tweet.findOneAndUpdate(
  {
    _id: id,
  },
  {
    $pull: {
      likes:{
        "userId":userId
      },
    }, 
  },
  {
    rawResult: true,
  },
);

const retweetsService = (id, userId) => Tweet.findOneAndUpdate(
  {
    _id: id,
    "retweets.userId": { $nin: [userId] },
  },
  {
    $push: {
      retweets: { userId, created: new Date() },
    },
  },
  {
    rawResult: true,
  }
);

const undoretweetsService = (id, userId) => Tweet.findOneAndUpdate(
  {
    _id: id,
  },
  {
    $pull: {
      retweets:{
        "userId":userId
      },
    }, 
  },
  {
    rawResult: true,
  },
);

const commentsService = (id, userId, comment_id, comment) => Tweet.findOneAndUpdate(
  {
    _id: id,
  },
  {
    $push: {
      comments: { userId, comment_id, comment, created: new Date() },
    },
  },
  {
    rawResult: true,
  }
);

const uncommentsService = (id, comment_id) => Tweet.findOneAndUpdate(
  {
    _id: id,
  },
  {
    $pull: {
      comments: { "comment_id": comment_id},
    },
  },
  {
    rawResult: true,
  }
);

const countTweets = () => Tweet.countDocuments();

module.exports = { 
  createTweetService, 
  findAllTweetsService, 
  searchTweetService, 
  likesService,
  dislikesService,
  retweetsService,
  undoretweetsService,
  commentsService,
  uncommentsService,
  countTweets 
};
