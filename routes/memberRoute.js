import express from "express";
import { create, update, deleteMember, readAll, readById } from "../controller/memberController.js";

const route = express.Router();

route.post("/create", create); 
route.get("/getAllMembers", readAll); 
route.get("/getMember/:id", readById); 
route.put("/update/:id", update);
route.delete("/delete/:id", deleteMember);

export default route;