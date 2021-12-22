import {client} from "./index.js";
import {ObjectId} from 'mongodb';




// export async function updateMovieById(client, id, data) {
//     return await client
//         .db("test")
//         .collection("movies")
//         .updateOne({ id: id }, { $set: data });
// }
// export async function createMovies(client, data) {
//     return await client
//         .db("test")
//         .collection("movies")
//         .insertMany(data);
// }
// export async function deleteMovieById(client, id) {
//     return await client
//         .db("test")
//         .collection("movies")
//         .deleteOne({ id: id });
// }
// export async function getMovieById(client, id) {
//     return await client
//         .db("test")
//         .collection("movies")
//         .findOne({ id: id });
// }







// async function getMovies(client, filter) {
//     return await client
//         .db("test")
//         .collection("movies")
//         .find(filter).toArray();
// }
async function getMovies(filter) {
    return await client
        .db("test")
        .collection("movies")
        .find(filter).toArray();
}
async function updateMovieById(id, data) {
    return await client
        .db("test")
        .collection("movies")
        .updateOne({_id:ObjectId(id)}, { $set: data });
}
async function createMovies(data) {
    return await client
        .db("test")
        .collection("movies")
        .insertMany(data);
}
async function createUser(data) {
    return await client
        .db("test")
        .collection("users")
        .insertOne(data);
}
async function deleteMovieById(id) {
    return await client
        .db("test")
        .collection("movies")
        .deleteOne({id:ObjectId(id)});
}
async function getMovieById(id) {
    console.log("*****",id);
    return await client
        .db("test")
        .collection("movies")
        .findOne({_id:ObjectId(id)});
}

async function getUserByName(username) {
    return await client
        .db("test")
        .collection("users")
        .findOne({ username: username });
}

export {
     getMovies,
      getMovieById, 
      createMovies, 
      deleteMovieById, 
      updateMovieById, 
      createUser,
      getUserByName,
    };

      