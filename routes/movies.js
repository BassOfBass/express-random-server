import express from "express";
// TODO: rewrite to use with MongoDB
const router = express.Router();

class Movie {
  /**
   * 
   * @param {number} id 
   * @param {string} name 
   * @param {number} year 
   * @param {number} rating 
   */
  constructor(id, name, year, rating) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.rating = rating;
  }
}

const movies = [
  new Movie(101, "Fight Club", 1999, 8.1),
  new Movie(102, "Inception", 2010, 8.7),
  new Movie(103, "The Dark Knight", 2008, 9),
  new Movie(104, "12 Angry Men", 1957, 8.9),
];

router.get("/", (rq, res) => {
  res.json(movies);
});

router.get("/:id[0-9]{3}", (req, res) => {
  const currentMovie = movies.filter((movie) => {

    if (movie.id === req.params.id) {
      return true
    }

  });

  if (currentMovie.length === 1) {
    res.json(currentMovie[0]);
  } else {
    res.status(404); // Set status to 404 as movie was not found
    res.json({ message: "Not Found" });
  }

});

router.post("/", (req, res) => {
  // check if all fields are provided and are valid
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    let newId = movies[movies.length - 1].id + 1;
    movies.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating
    });
    
    res.json({ message: "New movie created.", location: `/movies/${newId}` });
  }
  
});

router.put("/:id", (req, res) => {
  
  // check if all fields are provided and are valid
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
    !req.params.id.toString().match(/^[0-9]{3}$/g)
  ) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    // get the index of movie with given id
    let updateIndex = movies.map((movie) => {
      return movie.id;
    }).indexOf(parseInt(req.params.id));

    if (updateIndex === -1) {
      // movie not found, create new
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating
      });
      res.json({message: "New movie created.", location: `/movies/${req.params.id}` });
    } else {
      // update existing movie
      movies[updateIndex] = {
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating
      }
      res.json({
        message: `Movie id ${req.params.id} updated.`, 
        location: `/movies/${req.params.id}` 
      });
    }
  }
});

router.delete("/:id", (req, res) => {
  // get the index of movie with given id
  let removeIndex = movies.map((movie) => {
    return movie.id;
  }).indexOf(req.params.id); 

  if (removeIndex === -1) {
    res.json({message: "Not found"});
  } else {
    movies.splice(removeIndex, 1);
    res.send({message: `Movie id ${req.params.id} removed.`})
  }

});

export default router;