import mongoose from "mongoose";

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String,
});

const Person = mongoose.model("Person", personSchema);

export default Person;