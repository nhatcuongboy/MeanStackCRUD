import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

let equipmentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
    assign: {
      type: String,
    },
  },
  {
    collection: "equipments",
  }
);

equipmentSchema.plugin(uniqueValidator, { message: "name already in use." });

module.exports = mongoose.model("Equipment", equipmentSchema);
