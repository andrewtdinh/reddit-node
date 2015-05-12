'use strict';

var Post = require('../../models/post');
var User = require('../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/posts',
    config: {
      description: 'Create a post',
      validate: {
        payload: {
          title: Joi.string().min(3).required(),
          url: Joi.string(),
          body: Joi.string(),
          photo: Joi.string()
        }
      },
      handler: function(request, reply){
        User.findById(request.auth.credentials._id, function(err, user){
          var post = new Post(request.payload);
          post.userId = request.auth.credentials._id;
          post.author = user.username;
          post.save(function(){
            return reply(post);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.create'
};
