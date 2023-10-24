const router = require("express").Router();
const path = require("path");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 


router
  .route("/:movieId/reviews")
  .get(controller.reviewsList)
  .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.theaterList)
    .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router 
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;