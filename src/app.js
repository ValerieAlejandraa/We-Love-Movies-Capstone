if (process.env.USER) require("dotenv").config();
const express = require("express");//backend framework
//const morgan = require("morgan");//logs for express
const cors = require("cors");

const app = express();
//routers in routes file
const moviesRouter = require("./movies/movies-router");
const reviewsRouter = require("./reviews/reviews-router");
const theatersRouter = require("./theaters/theaters-router");


app.use(express.json()); 
app.use(cors());

// middleware Routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);



// Not-found handler
app.use((request, _response, next) => {
    next({ status: 404, message: `Not found: ${request.originalUrl}` });
  });
  
// Error handler
app.use((error, _request, response, _next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
});

module.exports = app;

