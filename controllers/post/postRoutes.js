const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');
const fs = require('fs');