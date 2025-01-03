import { userService } from "../services/userService.js";
import { ApiError } from "../exceptions/ApiError.js";
import { jwtService } from "../services/jwtService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserTracker } from "../models/index.js";

function validateEmail(str) {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regexEmail.test(str)) {
    return ''
  } else {
    return 'Email is not valid'
  }
}

function validatePassword(str) {
  if (!str) {
    return 'Password can not be empty'
  }
  if (str.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return ''
}

async function register(req, res) {
  const { email, password } = req.body;

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
    throw ApiError.BadRequest('Validation error', { email: emailError, password: passwordError })
  }

  await userService.registerUser({ email, password });
  res.send({ message: 'OK' });
};

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password, 'email password')

  const user = await userService.getByEmail(email);
  if (!user) {
    throw ApiError.BadRequest('User with this email does not exist', { email: 'User with this email does not exist' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw ApiError.BadRequest('Wrong password', { password: 'Wrong password' });
  }

  const accessToken = jwtService.generateAccessToken(user.id);
  const refreshToken = jwtService.generateRefreshToken(user.id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken, user });
}

async function getUserById(userId) {
  try {
    const user = await UserTracker.findOne({ where: { id: userId } });
    return user || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Database error occurred");
  }
}

async function refresh(req, res) {
  const cookies = req.cookies;
  const refreshToken = req.cookies.refreshToken;



  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await getUserById(decoded.data);
    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwtService.generateAccessToken(user);
    return res.json({ accessToken: newAccessToken });
    
  } catch (error) {
    console.error("Error validating refresh token:", error);
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
}

export const authController = {
  register,
  login,
  refresh
}