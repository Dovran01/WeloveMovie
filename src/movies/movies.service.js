const knex = require("../db/connection");


function list() {
  return knex("movies").select("*");
}

function filteredList(){
    console.log("filteredList working")
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true})
}

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function theatersPlayingMovie(movieId){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({"mt.movie_id": movieId})
}

function movieReviewData(movieId){
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("c.*","c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "r.*")
    .where({"r.movie_id": movieId})
    .then((data) => data.map((review)=> {
      return {
      "review_id": review.review_id,
      "content": review.content,
      "score": review.score,
      "created_at": review.created_at,
      "updated_at": review.updated_at,
      "critic_id": review.critic_id,
      "movie_id": review.movie_id,
      "critic":{
        "critic_id": review.critic_id,
        "preferred_name": review.preferred_name,
        "surname": review.surname,
        "organization_name": review.organization_name,
        "created_at": review.critic_created_at,
        "updated_at": review.critic_updated_at
      }
    }}))
}



module.exports = {

  list,
  filteredList,
  read,
  theatersPlayingMovie,
  movieReviewData
};