import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET variables are not defined in the .env file');
}

function generateAccessToken(user) {
  return jwt.sign({data: user}, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1h'
  })
}

function validateAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    }

    catch(e) {
        return null;
    }
}

function generateRefreshToken(user) {
  return jwt.sign({data: user}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '24d'
  })
}

function validateRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}

catch(e) {
    return null;
}
}

export const jwtService = {
    generateAccessToken,
    validateAccessToken,
    generateRefreshToken,
    validateRefreshToken

}