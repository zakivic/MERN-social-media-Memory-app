import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

import User from "../models/userModel.js";


export const signin = async (req, res) => {
  console.log('you reach signin');
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "1h" });
    const user = {
      name: oldUser.name,
      _id: oldUser._id
    }
 
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log('you reach signup');
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" } );
    const user = {
      name: result.name,
      _id: result._id
    }
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};


export const googleAuthFindOrCreateUser = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;

  try {

    const oldUser = await User.findOne({ email });

    if (oldUser) {

      const token = jwt.sign( { email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "1h" } );
      res.status(201).json({ result: oldUser, token });

    } else {

    const result = await User.create({ email, password, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
    }
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const getUser = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  

  try {
    const user = await User.findById(id);
    res.status(200).json({id: user._id, name: user.name});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  
  
}