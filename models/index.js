const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

// post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});


// comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});


// comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});


// user can post many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

module.exports = { User, Post, Comment };

