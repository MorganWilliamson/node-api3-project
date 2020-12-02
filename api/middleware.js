const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

////////// Custom Middleware //////////
// logger(): console.logs request method, request url, and a timestamp.
const logger = (req, res, next) => {
    console.log(req.method, req.url, Date.now());
    next();
  };
 
// validateUserId(): check DB for a valid user. Return valid user or 404 otherwise. 
const validateUserId = async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.getById(id)

    if (!user) {
        res.status(404).json({ message: "request requires a user id" })
    } else if (!user.id) {
        res.status(400).json({ message: "invalid user id" })
    } else {
        req.user = user;
        next();
    }
};
  
// validateUser(): validates that new users have a name, returns a 400 otherwise. 
const validateUser = async (req, res, next) => {
    if (!req) {
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};
  
// validatePost(): similar to validateUser, but with posts. 
const validatePost = async (req, res, next) => {
    const { id } = req.params;
    const post = await Posts.getById(id);

    if (!post) {
        res.status(400).json({ message: "missing post data" })
    } else if (!post.text) {
        res.status(400).json({ message: "missing required text field" })
    } else {
        next();
    }
}
  
  module.exports = {
      logger,
      validateUserId,
      validateUser,
      validatePost,
  }