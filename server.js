import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import Register from "./registerModel.js"
import connectDb from "./dbConnection.js"
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

var port = process.env.PORT || 5001
connectDb()

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('home.html');
})


app.post("/register" , async (req,res)=>{
    const {username , email , password} = req.body;
    
    try {
       
        
        if(!username || !email || !password){
            throw new Error("All fields are mandatory!")
        }

        const exitUser = await Register.findOne({email})

        if(exitUser){
            return res.send("User already existed!")
        }
        const signup = await Register.create({
            username,
            email,
            password
        });

        

    //    res.status(201).render(signup);
       return res.redirect('success.html')

    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error)
    }
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}` )
})