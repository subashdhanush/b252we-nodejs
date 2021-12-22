//const { response } = require("express");
//const express=require("express");
import express from "express";
import dotenv from "dotenv";
import {Db, MongoClient} from "mongodb";
import { getMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "./helper.js";
import { moviesRouter } from "./routes/movies.js";
import cors from "cors";
// import { userRouter } from "./routes/users.js";
import { usersRouter } from "./routes/users.js";


dotenv.config();

const app=express();
const PORT=process.env.PORT || 9000;
//const MONGO_URL="mongodb://localhost";
//const MONGO_URL="mongodb+srv://subash_03:12345@cluster0.brumh.mongodb.net";   
const MONGO_URL=process.env.MONGO_URL;

// const RECIPES_LIST=[
//     {
//       "picture": "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg",
//       "name": "Panner butter masala"
//       },
//       {
//       "picture": "https://static.toiimg.com/thumb/64696930.cms?width=1200&height=900",
//       "name": "Parotta shawarma"
//       },
//       {
//       "picture": "https://healthyrecipesblogs.com/wp-content/uploads/2013/02/tandoori-chicken-featured-2021.jpg",
//       "name": "Chicken tandoori"
//       },
//       {
//       "picture": "https://images.indulgexpress.com/uploads/user/imagelibrary/2019/8/1/original/Biryanifest.jpg",
//       "name": "Briyani"
//       },
//       {
//       "picture": "https://www.kannammacooks.com/wp-content/uploads/baked-gobi-manchurian-recipe-1.jpg",
//       "name": "Gobi machurian"
//       }
//   ];
// const movies=[{"id":"100",
// "name":"Iron man 2",
// "poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
// "rating":7,
// "summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
// "trailer":"https://www.youtube.com/embed/wKtcmiifycU",
// "language":"english"
// },
// {"id":"101",
// "name":"No Country for Old Men",
// "poster":"https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
// "rating":8.1,
// "summary":"A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
// "trailer":"https://www.youtube.com/embed/38A__WT3-o0",
// "language":"english"
// },
// {"id":"102",
// "name":"Jai Bhim",
// "poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
// "summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
// "rating":8.8,
// "trailer":"https://www.youtube.com/embed/nnXpbTFrqXA",
// "language":"tamil"
// },
// {
// "id":"103",
// "name":"The Avengers",
// "rating":8,
// "summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
// "poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
// "trailer":"https://www.youtube.com/embed/eOrNdBpGMv8",
// "language":"english"
// },
// {  "id":"104",
// "name":"Interstellar",
// "poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
// "rating":8.6,
// "summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
// "trailer":"https://www.youtube.com/embed/zSWdZVtXT7E",
// "language":"english"
// },
// {
// "id":"105",
// "name":"Baahubali",
// "poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
// "rating":8,
// "summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
// "trailer":"https://www.youtube.com/embed/sOEg_YZQsTI",
// "language":"telugu"
// },
// {
// "id":"106",
// "name":"Ratatouille",
// "poster":"https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
// "rating":8,
// "summary":"Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
// "trailer":"https://www.youtube.com/embed/NgsQ8mVkN8w",
// "language":"english"
// }]

app.use(express.json());
app.use(cors());

async function createConnection(){
   const client=new MongoClient(MONGO_URL);
   await client.connect(); 
   console.log("Mongodb connected");
   
   return client;
}

export const client=await createConnection();

app.get("/",(request,response)=>{
 
    response.send("Hello World222!!! 😁😁😁😁 **** 🌎🌎🌎🌎 ***");
});



app.use('/movies',moviesRouter);
app.use('/users',usersRouter);
app.get("/recipes",async (request,response)=>{
    // response.send(RECIPES_LIST);
    const recipes=await client
    .db("test")
    .collection("recipes")
    .find({})
    .toArray();
    response.send(recipes);
});
app.post("/recipes",async (request,response)=>{
    const data=request.body;
    const result=await client.db("test").collection("recipes").insertMany(data);
    response.send(result);
});
app.listen(PORT, ()=>console.log("App is started on",PORT));


