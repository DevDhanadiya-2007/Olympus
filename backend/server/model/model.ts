import mongoose, { Schema, Model, Document } from "mongoose";

interface IUser extends Document {
    googleId?: string
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    }
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { User };
