import { v4 as uuidv4 } from 'uuid';
import { UserTracker } from "../models/index.js";
import { ApiError } from "../exceptions/ApiError.js";
import bcrypt from 'bcrypt';

async function registerUser({ email, password }) {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('User with this email already exist', {email: 'Email is already taken' });
  }

  const hash = await bcrypt.hash(password, 10);

  await UserTracker.create({ email, password: hash });
}

async function getByEmail(email) {
  const user = await UserTracker.findOne({where: {
    email
  }});

  return user;
}

export const userService = {
  registerUser,
  getByEmail
}