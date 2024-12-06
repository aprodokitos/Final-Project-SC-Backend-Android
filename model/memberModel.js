import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: String,
    membership_type: String,
    join_date: {
        type : Date,
        default : Date.now
    }
});

// Mengubah format supaya hanya menampilkan tanggal
memberSchema.pre("save", function (next) {
    const currentDate = new Date(this.join_date);
    this.join_date = new Date(currentDate.toDateString()); // Hanya tanggal, tanpa waktu
    next();
});

memberSchema.set("toJSON", {
    transform: (doc, ret) => {
        if (ret.join_date) {
            ret.join_date = ret.join_date.toISOString().split("T")[0]; // Format menjadi 'YYYY-MM-DD'
        }
        return ret;
    }
});

export default mongoose.model("members", memberSchema);