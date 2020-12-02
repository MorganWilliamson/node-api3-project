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
  Posts.add(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      res.status(500).json( error.message )
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving the specified post." })
    })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving posts from the server." })
    })
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving post by ID." })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((userPosts) => {
      res.status(200).json(userPosts)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Could not get posts by specified user." })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "The specified user could not be removed." })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "The specified user could not be updated." })
    })
});

module.exports = router;
