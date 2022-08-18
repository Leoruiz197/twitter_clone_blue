const User = require("../models/User");

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserService = (body) => User.create(body);

module.exports = { findByEmailUserService, createUserService };