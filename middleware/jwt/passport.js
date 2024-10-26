import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { connectDB } from "../../db/connection.js";
import { collectionNameUser } from "../../utils/helper.js";
import { ObjectId } from "mongodb"; // Ensure ObjectId is imported

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY, // Your secret key
};

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      console.log("🚀 ~ newJwtStrategy ~ jwtPayload:", jwtPayload);
      try {
        const db = await connectDB();
        console.log("Connected to database:", db);
        const userCollection = await db.collection(collectionNameUser);
        console.log("Searching for user with ID:", jwtPayload.id);

        const foundUser = await userCollection.findOne({
          _id: new ObjectId(jwtPayload.id),
        });
        console.log("Found User:", foundUser); // Log what was found

        if (foundUser) {
          return done(null, foundUser); // User found
        }
        return done(null, false); // User not found
      } catch (error) {
        console.error("Error during user lookup:", error); // Log the error
        return done(error, false);
      }
    })
  );
};

export default passportConfig;
