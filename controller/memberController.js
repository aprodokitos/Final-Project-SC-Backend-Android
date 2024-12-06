import Members from "../model/memberModel.js";

// coba http://localhost:3000/api/members/(function)
export const create = async (req, res) => {
    try{
        const memberData = new Members(req.body);
        const { name } = memberData;

        const memberExist = await Members.findOne({ name });
        if (memberExist) {
            return res.status(400).json({ message: "Member already exists."});
        }
        const savedMember = await memberData.save();
        res.status(200).json(savedMember);
    } catch (error) {
        res.status(500).json({ error: "Internal server error."});
    }
};

export const readAll = async (req, res) => {
    try {
        const members = await Members.find();
        if (members.length === 0) {
            return res.status(404).json({ message: "Members not found."});
        }
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: "Internal server error."});
    }
}; 

export const readById = async (req, res) => {
    try {
        const { id } = req.params; 
        const member = await Members.findById(id);
        if (!member) {
            return res.status(404).json({ message: "Member not found." });
        }
        res.status(200).json(member); 
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

export const update = async(req, res) => {
    try{
        const id = req.params.id;
        const memberExist = await Members.findById(id);
        if (!memberExist) {
            return res.status(404).json({ message: "User not found." });
        }
        const updateMember = await Members.findByIdAndUpdate(id, req.body, {new:true});
        res.status(201).json(updateMember);
    } catch (error) {
        res.status(500).json({ error: "Internal server error."});
    }
};

//http://localhost:3000/api/members/delete/(id member)
export const deleteMember = async (req, res) => {
    try{
        const id = req.params.id;
        const memberExist = await Members.findById({ _id:id });
        if (!memberExist) {
            return res.status(404).json({ message: "User not found." });
        }
        await Members.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully."});
    } catch (error) {
        res.status(500).json({ error: "Internal server error."});
    }
};