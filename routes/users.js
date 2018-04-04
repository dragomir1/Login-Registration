const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const session = require('express-session');
const UserController = require('./../controllers/users');



module.exports = function (app) {

	app.get('/', function(req, res){
		if(session.user === undefined){
			res.render('index', {errors: session.errors});
		}
		else{
			res.render('success', {user: session.user});
		}
	})

	app.post('/register', function(req, res){
		UserController.register(req, res);
	})

	app.post('/login', function(req, res){
		UserController.login(req, res);
	})

	app.get('/logout', function(req, res){
		session.user = undefined;
		res.redirect('/');
	})
}
