import crypto from "crypto";
import jwt from "jsonwebtoken";

// import
import { collectionNameUser } from "../../utils/helper.js";
import { errorResponse, successResponse } from "../../utils/responseHelper.js";
import {
  connectDb,
  deleteDocument,
  getByIdDocument,
  getDocument,
  insertDocument,
  updateDocument,
} from "../../db/dbService.js";
import { sendTemplatedEmail } from "../../mail/email.js";

export const getUsers = async (req, res) => {
  try {
    const user = await getDocument(collectionNameUser);
    return successResponse(res, "Successfully fetched tour", user);
  } catch (error) {
    return errorResponse(res, "Failed to fetch user", error);
  }
};

export const addUsers = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const user = await connectDb(collectionNameUser);
    const findEmailRegistered = await user.findOne({ email: email });
    if (findEmailRegistered) {
      return errorResponse(res, "Email already registered", 400);
    } else {
      const salt = crypto.randomBytes(16);
      // Hash the password using pbkdf2 with a salt
      const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(
          password,
          salt,
          310000,
          32,
          "sha256",
          (err, derivedKey) => {
            if (err) return reject(err); // Reject the promise in case of an error
            resolve(derivedKey.toString("hex")); // Convert buffer to string for storage
          }
        );
      });

      const insertUser = await insertDocument(collectionNameUser, {
        name: name,
        password: hashedPassword,
        salt: salt.toString("hex"),
        email: email,
        phone: phone,
        role: "user",
        profile: "",
        state: "",
        city: "",
        address: "",
        zipcode: "",
        varified: false,
      });
      sendTemplatedEmail(
        email,
        "Welcome to Airway Horizons",
        name,
        "cleanTemplate.ejs"
      );
      return successResponse(res, "Successfully added user", insertUser);
    }
  } catch (error) {
    return errorResponse(res, "Failed to fetch user", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await connectDb(collectionNameUser);
    const findEmailRegistered = await user.findOne({ email: email });

    if (findEmailRegistered) {
      const salt = findEmailRegistered?.salt;

      const hashedLoginPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(
          password,
          Buffer.from(salt, "hex"),
          310000,
          32,
          "sha256",
          (err, derivedKey) => {
            if (err) return reject(err);
            resolve(derivedKey.toString("hex"));
          }
        );
      });
      // Compare the hashed passwords
      if (hashedLoginPassword !== findEmailRegistered?.password) {
        return errorResponse(res, "Invalid  password", 401);
      }

      const token = jwt.sign(
        {
          id: findEmailRegistered._id?.toString(),
          email: findEmailRegistered.email?.toString(),
          role: findEmailRegistered.role?.toString(),
        }, // Payload
        process.env.SECRET_KEY, // Your secret key
        { expiresIn: "48h" } // Token expiration time
      );
      const setData = {
        token: token,
        id: findEmailRegistered._id?.toString(),
        email: findEmailRegistered.email,
        role: findEmailRegistered.role,
      };
      return successResponse(res, "Login success", setData);
    } else {
      return errorResponse(res, "Email not found", 400);
    }
  } catch (error) {
    return errorResponse(res, "Failed to fetch user");
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  !userId && errorResponse(res, "User ID is required", 400);

  try {
    const profilePicture = req.file ? req.file.filename : null;
    const { name, phone, state, city, address, zipcode, country } = req.body;

    const updatedUserData = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(state && { state }),
      ...(city && { city }),
      ...(address && { address }),
      ...(zipcode && { zipcode }),
      ...(country && { country }),
      ...(profilePicture && { profile: `/uploads/${profilePicture}` }),
    };

    const result = await updateDocument(
      collectionNameUser,
      userId,
      updatedUserData
    );

    result.modifiedCount === 0 &&
      errorResponse(res, "User not found or no changes made", 404);

    return successResponse(res, "User updated successfully", updatedUserData);
  } catch (error) {
    errorResponse(res, "Update failed please try again", 500);
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  !userId && errorResponse(res, "User ID is required", 400);
  try {
    const result = await getByIdDocument(collectionNameUser, userId);
    if (!result) return errorResponse(res, "User not found", 404);
    if (result?.profile) {
      const profileUrl = `${req.protocol}://${req.get("host")}${
        result.profile
      }`;
      result.profile = profileUrl;
    }
    delete result.salt;
    delete result.password;

    return successResponse(res, "User found", result);
  } catch (error) {
    errorResponse(res, "Update failed please try again", 500);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userCollection = await connectDb(collectionNameUser);
    const findEmailRegistered = await userCollection.findOne({ email });

    if (!findEmailRegistered) {
      return errorResponse(res, "Email not found", 400);
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Store the OTP and expiry time in the user's record
    await userCollection.updateOne({ email }, { $set: { otp, otpExpiry } });

    sendTemplatedEmail(
      email,
      "Password Reset OTP",
      "",
      "otpTemplate.ejs",
      otp,
      email
    );

    return successResponse(res, "OTP sent to email");
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    return errorResponse(res, "Failed to process request");
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userCollection = await connectDb(collectionNameUser);

    // Find the user by email and check OTP
    const user = await userCollection.findOne({ email });
    if (!user || user.otp !== otp) {
      return errorResponse(res, "Invalid OTP", 400);
    }

    // Check if OTP is expired
    if (new Date() > new Date(user.otpExpiry)) {
      return errorResponse(res, "OTP expired", 400);
    }

    return successResponse(res, "OTP verified");
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return errorResponse(res, "Failed to verify OTP");
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const userCollection = await connectDb(collectionNameUser);

    // Find the user and verify OTP
    const user = await userCollection.findOne({ email });
    if (!user || user.otp !== otp) {
      return errorResponse(res, "Invalid OTP or email", 400);
    }

    // Check if OTP is expired
    if (new Date() > new Date(user.otpExpiry)) {
      return errorResponse(res, "OTP expired", 400);
    }

    // Generate a new salt using crypto.randomBytes
    const salt = crypto.randomBytes(16);

    const hashedPassword = await new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password, // Password to hash
        salt, // Salt value
        310000, // Iteration count (can adjust as needed)
        32, // Key length (32 bytes)
        "sha256", // Hash algorithm
        (err, derivedKey) => {
          if (err) return reject(err); // Reject the promise in case of an error
          resolve(derivedKey.toString("hex")); // Convert buffer to hex string for storage
        }
      );
    });

    // Update the password and clear OTP fields in the database
    await userCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword, // Save the hashed password
          salt: salt.toString("hex"), // Save the salt in hex format
        },
        $unset: { otp: "", otpExpiry: "" }, // Clear OTP fields
      }
    );

    return successResponse(res, "Password updated successfully");
  } catch (error) {
    console.error("Error in changePassword:", error);
    return errorResponse(res, "Failed to update password");
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const userCollection = await connectDb(collectionNameUser);

    // Check if email exists in the system
    const user = await userCollection.findOne({ email });
    if (!user) {
      return errorResponse(res, "Email not found", 400);
    }

    // Generate a new 6-digit OTP and expiry time
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Update the OTP and expiry time in the database
    await userCollection.updateOne({ email }, { $set: { otp, otpExpiry } });

    sendTemplatedEmail(email, "Password Reset OTP", "", "otpTemplate.ejs", otp);

    return successResponse(res, "OTP resent to email");
  } catch (error) {
    console.error("Error in resendOTP:", error);
    return errorResponse(res, "Failed to resend OTP");
  }
};
