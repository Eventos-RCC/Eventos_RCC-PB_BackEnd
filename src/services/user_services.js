import userRepository from '../repositories/user_repository.js';
import dioceseRepository from '../repositories/diocese_repository.js';

import bcrypt from "bcrypt";
import globalMiddleware from "../middlewares/global_middlewares.js";
import redis from "../models/redis_models.js";

import emailUtils from "../utils/emailUtils.js";
import logger from "../utils/logger.config.js";
import CustomError from "../utils/CustomError.js";
import { formatDateForDatabase } from "../utils/basicFunctions.js";
import { sendVerificationCodeToRedis, verify_code } from "../utils/functionsToRedis.js";


const initiateUserRegistration = async (body) => {
  logger.info("Initiating user registration process");
  const { name, email, password, phone, birthdate, diocese } = body;

  if (!name || !email || !password || !phone || !birthdate || !diocese) {
    logger.error("All fields are required");
    throw new CustomError("All fields are required", 400);
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    logger.error("Email already registered");
    throw new CustomError("Email already registered", 409);
  }

  const diocese_id = await dioceseRepository.findDioceseByName(diocese);
  if (!diocese_id) {
    logger.error("Diocese not found");
    throw new CustomError("Diocese not found", 400);
  }
  
  const formattedBirthDate = formatDateForDatabase(birthdate);

  if (password.length > 20 || password.length < 6) {
    logger.error("Password must be between 6 and 20 characters");
    throw new Error("Password must be between 6 and 20 characters", 400);
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const userDataToCache = {
    name,
    email,
    password: hashed_password,
    phone,
    birth: formattedBirthDate,
    diocese_id: diocese_id.diocese_id
  };

  logger.info("Saving data to Redis");
  const cacheResult = await redis.dataSave(
    "User_data",
    email,
    userDataToCache,
    1200
  );
  if (!cacheResult) {
    logger.error("Error saving data to Redis");
    throw new CustomError("Error saving data to Redis", 400);
  }

  const verificationCodeSend = await sendVerificationCodeToRedis(email);
  if (!verificationCodeSend) {
    logger.error("Error sending verification code");
    throw new CustomError("Error sending verification code", 400);
  }

  logger.info("Verification code sent to email");
  await emailUtils.sendCodeToEmail(
    email,
    verificationCodeSend
  );

  return { message: "Código enviado para o email", email };
};

const confirmVerificationCodeAndCreateUser = async (body, email) => {
  logger.info("verifying code");
  const { codeUser, resendCode } = body;

  if (resendCode === true) {
    const verificationCodeSend = await sendVerificationCodeToRedis(email);
    if (!verificationCodeSend) {
      logger.error("Error sending verification code");
      throw new CustomError("Error sending verification code", 400);
    }

    logger.info("Verification code sent to email");
    await emailUtils.sendCodeToEmail(email, verificationCodeSend);
    return { message: "Código enviado para o email", email };
  }

  if (!codeUser) {
    logger.error("Verification code is required");
    throw new CustomError("Verification code is required", 400);
  }

  const isValid = await verify_code(email, codeUser);
  if (!isValid) {
    logger.error("Invalid or expired code");
    throw new CustomError("Invalid or expired code", 400);
  }

  const cachedUserData = await redis.getData("User_data", email);
  if (!cachedUserData) {
    logger.error("User data has expired or is invalid.");
    throw new CustomError("User data has expired or is invalid.", 400);
  }

  const { name, password, phone, birth, diocese_id} =
    cachedUserData;

  const createdUser = await userRepository.createUser(name, email, password, phone, birth, diocese_id);
  if (!createdUser) {
    logger.error("Error creating user or missing required fields user");
    throw new CustomError(
      "Error Error creating user or missing required fields user",
      400
    );
  }

  await redis.delData("User_data", email);
  await redis.delData("verification_code", email);

  const token = await globalMiddleware.generateToken(
    createdUser.user_id,
    createdUser.level_user,
    email
  );
  if (!token) {
    logger.error("Error generating token");
    throw new CustomError("Error generating token", 400);
  }

  logger.info("User created successfully");
  return {
    message: "Código verificado com Sucesso. Usuário cadastrado: ",
    user: createdUser,
    token: token,
  };
};

const login = async (body) => {
  logger.info("Logging in user");
  const { email, password } = body;

  if (!email || !password) {
    logger.error("Email and password are required");
    throw new CustomError("Email and password are required", 400);
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    logger.error("User not found");
    throw new CustomError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.error("Email or password is incorrect");
    throw new CustomError("Email or password is incorrect", 401);
  }

  const token = await globalMiddleware.generateToken(
    user.user_id,
    user.level_user,
    user.email
  );
  if (!token) {
    logger.error("Error generating token");
    throw new CustomError("Error generating token", 400);
  }

  logger.info("User logged in successfully");
  return {
    message: "Login successful",
    token: token,
  };
};

const findUserData = async (userId) => {
  logger.info("Fetching user by ID")

  const user = await userRepository.findUserById(userId);
  if (!user) {
    logger.error("User not found")
    throw new CustomError('User not found', 404);
  }

  logger.info("User fetched successfully")
  return {
    message: "ser fetched successfully",
    user
  }
}

const updateOrCreateAdress = async (user_id, adress_id, body) => {
  logger.info('Updating or creating address for user');

  if (Object.keys(body).length === 0) {
    logger.error('No fields provided for update');
    throw new CustomError('No fields provided for update', 400);
  }

  const user = await userRepository.findUserById(user_id);
  if (!user) {
    logger.error("User not found")
    throw new CustomError('User not found', 404);
  }

  const { street, number, city, state, zip_code, complement } = body;

  let address;
  if (!adress_id) {
    if (!street || !number || !city || !state || !zip_code) {
      logger.error('Missing required fields');
      throw new CustomError('Missing required fields', 400);
    }

    address = await userRepository.updateOrCreateUserAdress(user_id, body, adress_id);
    logger.info("Address created successfully")
  } else {
    address = await userRepository.updateOrCreateUserAdress(user_id, body, adress_id);
    logger.info("Address updated successfully")
  }

  return {
    message: adress_id ? 'Address created successfully' : 'Address updated successfully',
    addres: {
      id: address.id,
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      complement: address.complement,
      event_id: address.event_id
    }
  }
}

export default {
  initiateUserRegistration,
  confirmVerificationCodeAndCreateUser,
  login,
  findUserData,
  updateOrCreateAdress
};
