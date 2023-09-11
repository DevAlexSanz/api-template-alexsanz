import mongoose from 'mongoose';
import userModel from './user.model.example.js';

// Get all users
export const getAllUsers = async (request, response) => {
  try {
    const users = await userModel.find();

    return response.status(200).json({
      code: 200,
      users,
    });
  } catch (err) {
    console.log(err.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

// Get user by ID
export const getUserById = async (request, response) => {
  const { id } = request.params;

  // validate if the ID format is correct
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      message: 'The ID format type entered is invalid',
      code: 400,
    });
  }
  // Check if the user exists in the database.
  const user = await userModel.findById(id);

  if (!user) {
    return response.status(404).json({
      message: 'The User does not exist in the database',
      code: 404,
    });
  }

  try {
    return response.status(200).json({
      message: 'User was found!',
      code: 200,
      user,
    });
  } catch (err) {
    console.log(err.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

// Create a new user
export const createUser = async (request, response) => {
  const { name, age, email } = request.body;

  // fields validation (no empty fields)
  if (!name || !age || !email) {
    return response.status(400).json({
      message: 'The fields name, age and email are required',
      code: 400,
    });
  }

  // Check if email already exists in database
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return response.status(409).json({
      message: 'Email already exists. Please enter a different email',
      code: 409,
    });
  }

  try {
    const userCreated = await userModel.create({
      name,
      age,
      email,
    });

    return response.status(201).json({
      message: 'User created and stored successfully',
      code: 201,
      userCreated,
    });
  } catch (err) {
    console.log(err.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

// update an existing user
export const updateUser = async (request, response) => {
  const { id } = request.params;
  const payload = request.body;

  // validate if the ID format is correct
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      message: 'The ID format type entered is invalid',
      code: 400,
    });
  }

  // Check if the user exists in the database.
  const user = await userModel.findById(id);
  if (!user) {
    return response.status(404).json({
      code: 404,
      message: 'The User does not exist in the database',
    });
  }

  // Validate if payload is not empty
  if (Object.keys(payload).length === 0) {
    return response.status(400).json({
      message: 'Payload is empty',
      code: 400,
    });
  }

  try {
    const userUpdated = await userModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return response.status(200).json({
      message: 'User updated successfully',
      code: 200,
      userUpdated,
    });
  } catch (err) {
    console.log(err.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;

  // validate if the ID format is correct
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      code: 400,
      message: 'The ID format type entered is invalid',
    });
  }

  // Check if the user exists in the database
  const user = await userModel.findById(id);
  if (!user) {
    return response.status(404).json({
      code: 404,
      message: 'The User does not exist in the database',
    });
  }

  try {
    await userModel.findByIdAndDelete(id);

    return response.status(200).json({
      code: 200,
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log(err.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
