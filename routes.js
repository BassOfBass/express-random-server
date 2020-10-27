// TODO: actually consolidate the routes
import indexRouter from './routes/index.js';
import thingsRouter from "./routes/things.js";
import usersRouter from './routes/users.js';
import testsRouter from "./routes/assess.js";
import moviesRouter from "./routes/movies.js";

app.use('/', indexRouter);
app.use('/things', thingsRouter);
app.use('/users', usersRouter);
app.use('/assess', testsRouter);
app.use("/movies", moviesRouter);