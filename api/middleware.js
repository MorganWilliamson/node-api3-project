////////// Custom Middleware //////////
// logger() console.logs request method, request url, and a timestamp.
const logger = (req, res, next) => {
    console.log(req.method, req.url, Date.now());
    next();
  }
  
  
  // validateUserId()
  
  
  // validateUser()
  
  
  // validatePost()
  
  module.exports = {
      logger,
  }