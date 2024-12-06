import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    payment_method:{
        type: String,
        required: true
    },
    payment_schedule:{
        type: String,
        enum: ["annual", "monthly", "daily"],
        required: true
    },
    referral_code:{
        type: String,
        required: false
    },
    member_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "members",
        required: true
    }
});

export default mongoose.model("payment", paymentSchema, "payment");
