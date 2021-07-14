//require mongoose
const { Schema, model } = require("mongoose");

//user model
const UserSchema = new Schema(
  {
    // username String,Unique,Required,Trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // email String,Required,Unique,Must match a valid email address (look into Mongoose's matching validation)
    email: {
      type: String,
      required: true,
      unique: true,
      match: [],
    },
    // thoughts Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // friends Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual("friendCount").get(function () {});
//create the User model using the UserSchema
const User = model("User", UserSchema);

module.exports = User;
