import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Express.User, Document {
    email: string;
    googleId?: string
    password?: string;
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
