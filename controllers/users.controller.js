const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Model
const { User } = require('../models/user.model')

// Error handlers
const { catchAsync } = require('../utils/catchAsync.util')
const { appError } = require('../utils/appError.util')
dotenv.config({ path: './config.env' });

// Petitions
const createUser = catchAsync(async (req, res, next) => {
    const { name, age, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        age,
        email,
        password: hashPassword,
    });

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser,
    });
})

const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate credentials (email)
    const user = await User.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Generate JWT (JsonWebToken) ->
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Send response
    res.status(200).json({
        status: 'success',
        token,
    });
})

const getAllActiveUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: {
            status: "active"
        }
    })
    res.status(201).json({
        status: 'success',
        users
    })
})

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, email } = req.body

    const user = await User.findOne({ where: { id } })

    await user.update({ name, email })

    res.status(201).json({
        status: 'success',
        user
    })
})

const disableUser = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const user = await User.findOne({ where: { id } })
    await user.update({
        status: 'disabled'
    })

    res.status(201).json({
        status: 'success',
        user
    })
})

module.exports = { createUser, loginUser, getAllActiveUsers, updateUser, disableUser }