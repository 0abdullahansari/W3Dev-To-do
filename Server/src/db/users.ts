import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     tasks:{ type: [String], default: [] },
//     authentication: {
//         password: { type: String, required: true, select: false },
//         salt: { type: String, select: false },
//         sessionToken: { type: String, select: false},
//     },
// });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    tasks: { type: [{ id: String, content: String, pending: Boolean }], default: [] },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false},
    },
});


export const UserModel = mongoose.model('User', UserSchema);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const createUser = (values: Record<string, any>) => new UserModel(values).save()
.then( (user) => user.toObject());