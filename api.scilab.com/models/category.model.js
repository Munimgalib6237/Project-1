const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    publications: [{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        default: null
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, {
    timestamps: true
})


const category = model("Category", categorySchema)
module.exports = category