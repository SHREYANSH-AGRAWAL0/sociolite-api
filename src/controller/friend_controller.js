const User = require('../models/user');


module.exports.sendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.body.recieverId);
        const sender = await User.findById(req.body.senderId);
        user.requestsRecieved.push(sender._id);
        sender.requestsSent.push(user._id);
        user.save();
        sender.save();
        console.log(`request sent from :${sender.id} to ${user.id}`);
        return res.json({ success: true, message: "request sent" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error Detected" });
    }
}

module.exports.acceptRequest = async (req, res) => {
    try {
        const reciever = await User.findById(req.body.recieverId);
        const sender = await User.findById(req.body.senderId);
        reciever.requestsRecieved.pull(req.body.senderId);
        reciever.friends.add(req.body.senderId);
        reciever.save();
        sender.requestsSent.pull(req.body.recieverId);
        sender.friends.add(req.body.recieverId);
        sender.save();
        console.log(`friend request accepted by :${reciever.id} from ${sender.id}`);
        return res.json({ success: true, message: "request accepted" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error Detected" });
    }
}