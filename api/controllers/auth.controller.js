import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

//REGISTER PART

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });


    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create a user" });
  }
};

//LOGIN PART

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //USERNAME CHECK
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    //PASSWORD CHECK
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials!" });

    //COOKIE HANDLING
    const age = 1000 * 60 * 60 * 24 * 7;

    //TOKEN CREATION
    const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    const {password: userPassword, ...userinfo} = user; 

    // res.setHeader("Set-Cookie","test="+"myValue").json("Successfully logged in!");
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true
      })
      .status(200)
      .json(userinfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
};
