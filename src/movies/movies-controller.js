const service = require("./movies-service");
//service: use Knex to retrieve data from database
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//if is_showing=true in query string, return only those movies wherethe movie is currently showing in theaters, check movies_theaters table
//show a list 
async function list(req,res){
     //if truthy
  if(req.query.is_showing){
    res.json({ data: await service.playingInTheaters(true) })
  } else {
    res.json({ data : await service.list()})
  }
  
}
//moviesId exist validation middleware
//next: will tell Express that this middleware function is complete, then it will go on to the next piece of middleware
async function movieIdExist(req,res,next){
  const { movieId } = req.params; 
  const movie = await service.read(movieId);
   
  if(movie){
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, error: "Movie cannot be found"})
}

function read(req,res) {
  res.json({ data: res.locals.movie})
}

async function readTheatersByMovie(req,res){
 res.json({ data: await service.readTheatersByMovie(res.locals.movie.movie_id)})
}

async function readReviewsByMovie(req,res){
  res.json({data: await service.readReviewsByMovie(res.locals.movie.movie_id)})
} 

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExist), read],
  readTheatersByMovie: [asyncErrorBoundary(movieIdExist),asyncErrorBoundary(readTheatersByMovie)],
  readReviewsByMovie:[asyncErrorBoundary(movieIdExist), asyncErrorBoundary(readReviewsByMovie)]
}
