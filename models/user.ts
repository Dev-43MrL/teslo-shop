import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: {
            values: ['admin','client'],
            message: '{value} no es un rol valido',
            default: 'client',
            required: true
        }
    }
},{
    timestamps: true,
})

const User:Model<IUser> = mongoose.models.User || model('User', UserSchema);
export default User;