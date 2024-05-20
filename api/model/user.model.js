import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'you have to provide password'],
  },
  photo: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c5Nj4a7oChd-rUn4OwOa53A_MmPJWjbi7fKCgyASFA&s',
  },
},{timestamps: true})


const User=mongoose.model('User',UserSchema)

export default User;