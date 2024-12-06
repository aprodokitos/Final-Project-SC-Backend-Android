import Payment from "../model/paymentModel.js";
import Members from "../model/memberModel.js";

//coba http://localhost:3000/api/payment/(function))
export const createPayment = async (req, res) => {
    try{
        const { member_id, name, payment_method, payment_schedule, referral_code } = req.body;
        const member = await Members.findById(member_id);
        if (!member) {
            return res.status(404).json({ message: "Member not found."});
        }
        const payment = new Payment({
            name, payment_method, payment_schedule, referral_code, member_id
        });
        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};  

export const readAllPayments = async (req, res) => {
    try {
        const payment = await Payment.find().populate("member_id", "name email");
        if (payment.length === 0) {
            return res.status(404).json({ message: "Payments not found." });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

export const readPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate("member_id", "name email");
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
            return res.status(404).json({ message: "Payment not found." });
        }
        const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentExist = await Payment.findById(id);
        if (!paymentExist) {
            return res.status(404).json({ message: "Payment not found." });
        }
        await Payment.findByIdAndDelete(id);
        res.status(200).json({ message: "Payment deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};