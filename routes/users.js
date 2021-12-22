import express from "express";
import bcrypt from "bcrypt";
// import { MongoClient } from "mongodb";
import {createMovies} from "../helper.js";
import { createUser } from "../helper.js";
import {getUserByName} from "../helper.js";
import jwt from "jsonwebtoken";

const router=express.Router();

router
.route("/signup")
.post(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    // const data=request.body;
    const {username,password}=request.body;
    // console.log(data);

  const { salt, hashedpassword } = await genPassword(password);
  console.log(salt,hashedpassword);
  const isUserExit=await getUserByName(username);
  console.log(isUserExit);
//   const result=await createUser({ username,password:hashedpassword });
//   response.send({ username,password:hashedpassword });
if(isUserExit){
response.status(400).send({message:"User already exists"});
return;
}
if(password.length<8){
    response.status(400).send({message:"Provide a longer password"});
    return;   
}
if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password))
{
    response.status(400).send({message:"Password pattern does not match"});
    return;  
}

const result=await createUser({username,password:hashedpassword});
response.send(result);
    // const result=await createMovies(client, data);
// response.send(result);
});

router
.route("/login")
.post(async (request,response)=>{
    // const {id}=request.params;
    const {username,password}=request.body;

//   const { salt, hashedpassword } = await genPassword(password);
  const userFromDB=await getUserByName(username);

  if(!userFromDB)
  {
   response.send({message:"Invalid credentials"});
   return;
  }
const storedPassword=userFromDB.password;
const isPasswordMatch=await bcrypt.compare(password,storedPassword);

if(isPasswordMatch)
{
  const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);  
 response.send({message:"Successful login",token:token});   
}
else
{
response.send({message:"Invalid credentials"});
}


});










export const usersRouter=router;

async function genPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedpassword = await bcrypt.hash(password, salt);
    return { salt, hashedpassword };
}
// export const moviesRouter=router;