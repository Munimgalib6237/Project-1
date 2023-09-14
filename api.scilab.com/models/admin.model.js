const { Schema, model } = require("mongoose")

const adminSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        default: "Super admin"
    },
    photo: {
        type: String,
        trim: true,
        default: null
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        default: null
    }
}, {
    timestamps: true
})


const admin = model("Admin", adminSchema)
module.exports = admin