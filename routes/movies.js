import express from "express";
// import { MongoClient } from "mongodb";
import {
     getMovies,
     getMovieById, 
     createMovies, 
     deleteMovieById, 
     updateMovieById 
   } from "../helper.js";

const router=express.Router();

router
.route("/")
.get(async(request,response)=>{
    console.log(request.query);
    const filter=request.query;
     if(filter.rating)
     {
      filter.rating=+filter.rating;   
     }
    // const client=await createConnection();

    //const filterMovies=await getMovies(client, filter);
     const filterMovies=await getMovies(filter);

    console.log(filter);
    // if(language){
    // filterMovies=filterMovies.filter((mv)=>mv.language===language)
    // }
    // if(rating)
    // {
    //  filterMovies=filterMovies.filter((mv)=>mv.rating=== +rating)   

    response.send(filterMovies);
})
.post(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    console.log(data);

    // const client=await createConnection();

    const result=await createMovies(client, data);
    // const result=await createMovies(data);
response.send(result);
});

router
.route("/:id")
.get(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;

    // const client=await createConnection();

    // const movie=await getMovieById(client, id);
    const movie=await getMovieById(id);


    const notFound={message:"No matching movie"};
    console.log(movie);

    movie ? response.send(movie):response.status(404).send(notFound);
})
.delete(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;

    const client=await createConnection();

    const movie=await deleteMovieById(client, id);

    // const movie=await deleteMovieById(id);
    const notFound={message:"No matching movie"};
    console.log(movie);
movie ? response.send(movie):response.status(404).send(notFound);
})
.put(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    console.log("data",data);

    const client=await createConnection();

    const result=await updateMovieById(client, id, data);
    // const result=await updateMovieById(id, data);

    const notFound={message:"No matching movie"};
    console.log(result);
response.send(result);
});

export const moviesRouter=router;