const { Schema, model } = require("mongoose")

const publicationSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    researcher: {
        type: Schema.Types.ObjectId,
        ref: "Researcher",
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    authors: [{
        type: String,
        trim: true,
        required: true
    }],
    publicationDate: {
        type: Date,
        trim: true,
        required: true
    },
    conference: {
        type: String,
        trim: true,
        required: true
    },
    publisher: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, {
    timestamps: true
})


const publication = model("Publication", publicationSchema)
module.exports = publication