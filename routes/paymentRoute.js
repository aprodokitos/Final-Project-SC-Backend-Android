import express from "express";
import {
    createPayment,
    readAllPayments,
    readPaymentById,
    updatePayment,
    deletePayment
} from "../controller/paymentController.js";

const route = express.Router();

route.post("/create", createPayment);
route.get("/getAllPayments", readAllPayments);
route.get("/getPayment/:id", readPaymentById);
route.put("/update/:id", updatePayment);
route.delete("/delete/:id", deletePayment);

export default route;
