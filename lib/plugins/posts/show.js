'use strict';

var Post = require('../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts',
    config: {
      description: 'Show all posts',
      handler: function(request, reply){
        // console.info('request: ', request);
        Post.find(function(err, posts){
          // console.info('posts: ', posts);
          return reply(posts);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.show'
};
