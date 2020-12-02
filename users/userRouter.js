const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

///// MIDDLEWARE /////

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

const validateUser = (req, res, next) => {
  if (!req) {
      res.status(400).json({ message: "missing user data" })
  } else if (!req.body) {
      res.status(400).json({ message: "missing required name field" })
  } else {
      next();
  }
};

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


///// ENDPOINTS /////

router.post('/', validateUser, (req, res) => {
  
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
});

module.exports = router;
