import express from 'express';
import createError from 'http-errors';
import { fileURLToPath } from "url";
import { join, dirname } from 'path';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import session from "express-session";
import logger from 'morgan';
import lessMiddleware from "less-middleware";  
import multer from "multer";
import mongoose from "mongoose";

import indexRouter from './routes/index.js';
import thingsRouter from "./routes/things.js";
import usersRouter from './routes/users.js';
import testsRouter from "./routes/assess.js";
import moviesRouter from "./routes/movies.js";

// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer();
// mongoose stuff
mongoose.connect(process.env.MONGOUSER, { useNewUrlParser: true, useUnifiedTopology: true, });

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// https://helmetjs.github.io
// > helmet.hidePoweredBy()
// > If you're using Express, this middleware will work, but you should use app.disable("x-powered-by") instead.
app.disable("x-powered-by");
app.use(helmet({ hidePoweredBy: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "big-secret_alright", name: "leRedditFaec" }));
app.use(lessMiddleware(join(__dirname, "public")));
app.use(upload.array());
app.use(express.static(join(__dirname, 'public')));

// routing
app.use('/', indexRouter);
app.use('/things', thingsRouter);
app.use('/users', usersRouter);
app.use('/assess', testsRouter);
app.use("/movies", moviesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
