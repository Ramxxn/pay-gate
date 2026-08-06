import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [emailRegex, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 4,
        maxlength: 95,
    },
    avatar: {
        type: String,
        default: null,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    }
);


UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

export default mongoose.models.User || mongoose.model("User", UserSchema)