const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async (req, res) => {
    try {
        let foundpost = await Post.findById(req.body.post);
        if (!foundpost) {
            console.log(`No such post found`);
            return res.json({ success: false, message: "No such post found" });
        }
        let newcomment = await Comment.create(req.body);
        foundpost.comments.push(newcomment);
        foundpost.save();
        console.log(`comment on ${req.body.post} by ${req.body.user}`);
        return res.json({ success: true, message: "comment successfully added" });
    } catch (err) {
        console.log(`Error Detected`);
        return res.json({ success: false, message: "Error Detected" });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let currComment = await Comment.findById(req.params.id);
        await Post.findByIdAndUpdate(currComment.post, { $pull: { comments: req.params.id } });
        currComment.remove();
        console.log(`Deleted the post`);
        return res.json({ success: true, message: "Deleted the post successfully" });
    } catch (error) {
        console.log(`Error Detected`);
        return res.json({ success: false, message: "Error Detected" });
    }
}