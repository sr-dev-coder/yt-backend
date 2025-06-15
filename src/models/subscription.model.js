import mongoose, { Schema } from "mongoose";

export const subsriptionSchema = new Schema({
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

export const Subsription = mongoose.model("Subsription", subsriptionSchema)