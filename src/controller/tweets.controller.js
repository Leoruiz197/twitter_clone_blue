const tweetService = require("../service/tweets.service");
const { v4: uuidv4 } = require('uuid');

const createTweetController = async (req, res) => {
    try {
        if(!req.body.message){
            res.status(400).send({message:"O Envie todos os dados necessários para a criação do tweet"});
        }

        const { id, message } = await tweetService.createTweetService(req.body.message, req.userId);

        return res.status(201).send({
            message:"Tweet criado com sucesso!",
            tweet: {id, message},
        })
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const findAllTweetsController = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        offset = Number(offset);
        limit = Number(limit);

        !offset ? offset = 0 : null;

        !limit ? limit = 6 : null;

        const tweets = await tweetService.findAllTweetsService(offset, limit);

        const total = await tweetService.countTweets();

        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl =
        previous != null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            : null;

        if (tweets.length === 0) {
        return res.status(400).send({ message: "Não existem tweets!" });
        }

        return res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: tweets.map((tweet) => ({
                id: tweet._id,
                message: tweet.message,
                likes: tweet.likes.length,
                comments: tweet.comments.length,
                retweets: tweet.retweets.length,
                name: tweet.user.name,
                username: tweet.user.username,
                avatar: tweet.user.avatar,
            })),
        })
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const searchTweetController = async (req, res) => {
    try {
        const tweets = await tweetService.searchTweetService(req.query.message);
    
        if (tweets.length === 0) {
        return res
            .status(400)
            .send({ message: "Não existem tweets com essa mensagem!" });
        }
    
        return res.send({
        tweets: tweets.map((tweet) => ({
            id: tweet._id,
            message: tweet.message,
            likes: tweet.likes.length,
            comments: tweet.comments.length,
            retweets: tweet.retweets.length,
            name: tweet.user.name,
            username: tweet.user.username,
            avatar: tweet.user.avatar,
            })),
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const likeTweetController = async (req, res) => {
    try{
        const tweetLiked = await tweetService.likesService(req.params.id, req.userId);

        if (tweetLiked.lastErrorObject.n === 0) {
            return res.status(400).send({ message: "Você já deu like neste tweet!"})
        };

        return res.send({
            message: "Like realizado com sucesso!"
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const dislikeTweetController = async (req, res) => {
    try{
        const tweetDisliked = await tweetService.dislikesService(req.params.id, req.userId);

        if (tweetDisliked.lastErrorObject.n === 0) {
            return res.status(400).send({ message: "Você já deu dislike neste tweet!"})
        };

        return res.send({
            message: "Disike realizado com sucesso!"
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const retweetTweetController = async (req, res) => {
    try{
        const tweetRetweeted = await tweetService.retweetsService(req.params.id, req.userId);

        if (tweetRetweeted.lastErrorObject.n === 0) {
            return res.status(400).send({ message: "Você já deu retweet neste tweet!" });
        }

        return res.send({
            message: "Retweet realizado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const undoretweetTweetController = async (req, res) => {
    try{
        const undotweetRetweeted = await tweetService.undoretweetsService(req.params.id, req.userId);

        if (undotweetRetweeted.lastErrorObject.n === 0) {
            return res.status(400).send({ message: "Você já deu undoretweet neste tweet!" });
        }

        return res.send({
            message: "Retweet realizado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const commentTweetController = async (req, res) => {  
    try{
        await tweetService.commentsService(req.params.id, req.userId, uuidv4(), req.body.comment);

        return res.send({
            message: "Comentário realizado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

const uncommentTweetController = async (req, res) => {
    try{
        await tweetService.uncommentsService(req.params.id, req.query.comment_id);

        return res.send({
            message: "Comentário apagado com sucesso!",
        });
    } catch (err) {
        res.status(500).send({ message: "Erro inesperado, tente novamente mais tarde"});
        console.log(err.message);
    }
};

module.exports = {
  createTweetController, 
  findAllTweetsController, 
  searchTweetController, 
  likeTweetController,
  dislikeTweetController,
  retweetTweetController,
  undoretweetTweetController,
  commentTweetController,
  uncommentTweetController
}