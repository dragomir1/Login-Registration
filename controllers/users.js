const mongoose = require('mongoose');
const session = require('express-session');
const User = mongoose.model('User');
const Schema = mongoose.Schema;


module.exports = {
	register: function(req, res){
		session.errors = [];
		if(req.body.password != req.body.pw_confirm){
			session.errors.push("Password and confirmation must match.")
		}
		var user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.first_name,
			lastname: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			birthday: req.body.birthday
    });
		user.save(function(err, saved_user){
			if(err){
        console.log(err);
				for(let k in err.errors){
					if(err.errors.hasOwnProperty(k)){
						session.errors.push(err.errors[k]);
					}
				}
			}
			else{
        console.log(saved_user);
				session.user = user;
			}
			res.redirect("/");
		})
	},

	login: function(req, res){
		//1. query db by email
		User.findOne({email: req.body.email}, function(err, user){
			session.errors = [];
			if(user == null){
				session.errors.push("No account associated with that email address.");
			}
			else{
				if(user.password == req.body.password){
					//if match, log in user (i.e. set user as session.user)
					session.user = user;
				}
				else{
					session.errors.push("Password incorrect.")
				}
			}
			res.redirect("/")
		})
	}
}
