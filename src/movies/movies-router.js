// Importing express module
// Creating express router object to handle requests
//router: mechanism where HTTP requests are routed to the code that handles them 
//determines how your app responds to a client request 
const router = require("express").Router();
const controller = require("./movies-controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const theatersRouter = require("../theaters/theaters-router");
const reviewsRouter = require("../reviews/reviews-router");


router
  .route("/:movieId/theaters")
  .get(controller.readTheatersByMovie)

router
  .route("/:movieId/reviews")
   .get(controller.readReviewsByMovie)


 router
   .route("/:movieId")
   .get(controller.read)
   .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);


module.exports = router; 