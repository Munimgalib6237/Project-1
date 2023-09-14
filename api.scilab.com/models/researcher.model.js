const { Schema, model } = require("mongoose")

const researcherSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        default: null
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        default: "Researcher"
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    about: {
        type: String,
        trim: true,
        default: null
    },
    education: [{
        school: {
            type: String,
            trim: true,
            default: null
        },
        department: {
            type: String,
            trim: true,
            default: null
        },
        passingYear: {
            type: String,
            trim: true,
            default: null
        }
    }],
    work: [{
        organization: {
            type: String,
            trim: true,
            default: null
        },
        department: {
            type: String,
            trim: true,
            default: null
        },
        position: {
            type: String,
            trim: true,
            default: null
        },
        startFrom: {
            type: Date,
            trim: true,
            default: null
        },
        endTo: {
            type: Date,
            trim: true,
            default: null
        },
        onGoing: {
            type: Boolean,
            default: true,
            enum: [true, false]
        }
    }],
    otherProfiles: [{
        title: {
            type: String,
            trim: true,
            default: null
        },
        link: {
            type: String,
            trim: true,
            default: null
        }
    }],
    publications: [{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        default: null
    }]
}, {
    timestamps: true
})


const researcher = model("Researcher", researcherSchema)
module.exports = researcher