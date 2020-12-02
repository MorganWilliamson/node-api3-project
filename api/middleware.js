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
        res.status(400).json({ message: "invalid user id" })
    } else {
        req.user = user;
        next();
    }
}
  
  // validateUser()
  
  
  // validatePost()
  
  module.exports = {
      logger,
      validateUserId,
  }