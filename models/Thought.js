//require mongoose
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//reaction schema
const ReactionSchema = new Schema({
  // reactionId Use Mongoose's ObjectId data type,Default value is set to a new ObjectId
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => Types.ObjectId(),
  },
  // reactionBody String,Required,280 character maximum
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  // username String, Required,
  username: {
    type: String,
    required: true,
  },
  // createdAt Date, Set default value to the current timestamp,Use a getter method to format the timestamp on query,
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

//thought schema
const ThoughtSchema = new Schema(
  {
    // thoughtText String,Required,Must be between 1 and 280 characters,
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    // createdAt Date,Set default value to the current timestamp,Use a getter method to format the timestamp on query,
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // username (The user that created this thought)String,Required,
    username: {
      type: String,
      required: true,
    },
    // reactions (These are like replies) Array of nested documents created with the reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
