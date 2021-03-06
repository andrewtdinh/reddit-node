'use strict';

var Post = require('../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts/{postId}',
    config: {
      description: 'Show one post by postId',
      handler: function(request, reply){
        // console.info('request: ', request);
        Post.findById({_id: request.params.postId}, function(err, post){
          console.info('post: ', post);
          return reply(post);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.show'
};
