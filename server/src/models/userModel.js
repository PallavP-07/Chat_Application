import { hash } from "bcrypt";
import mongoose ,{Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name:{
        type: String,
      required: true, 
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      selected: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) next();
  this.password= await hash(this.password,10);
})

export const User = mongoose.models.User || model("User", userSchema);
