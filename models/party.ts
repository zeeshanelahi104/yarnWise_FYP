import mongoose, { Schema } from "mongoose"

const partySchema = new Schema({
    partyName: { type: String, required: true },
    ownerName: { type: String, required: true },
    partyArea: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    balance : {type:Number},
    status: { type: String },
},{
    timestamps:true
})

const parties  = mongoose.models.parties || mongoose.model("parties",partySchema)

export default parties;