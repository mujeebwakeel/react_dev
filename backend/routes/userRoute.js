import express from "express";
import User from "../models/userModel"
import { getToken, isAuth } from "../util";
const router = express.Router();

router.post("/register", async (req,res) =>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        rePassword:req.body.rePassword,
        description: req.body.description 
    });
    const newUser = await user.save();
    if(newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            description:newUser.description,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({msg: "Invalid User Data"});
    }
});

router.put("/register/:id", isAuth, async (req, res) => {
    const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.description = req.body.description;
        
        const foundUser = await user.save();
    if(foundUser) {
        return res.send ({
            _id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            description: foundUser.description,
            token: getToken(foundUser),
            isAdmin: foundUser.isAdmin
        })
    }
    return res.status(500).send({message: "Error while updating User Profile"});
    });

router.post("/signin", async (req,res) =>{
    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            description: signinUser.description,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg: "Invalid email or password."});
    }
});

router.get("/createadmin", async (req, res) => {
    User.find({}, (err, foundUsers) => {
        if(err){
            console.log(error);
        }else{
            res.send(foundUsers);
        }
    })
        
    });
    // try {
    //     const user = new User({
    //         name: "Mujeeb",
    //         email: "wakeelmujeeb@yahoo.com",
    //         password: "123",
    //         isAdmin: true
    //     });
    
    //     const newUser = await user.save();
    //     res.send(newUser);
    // } catch (error) {
    //     res.send({msg:error.message});
    // }
    

export default router;