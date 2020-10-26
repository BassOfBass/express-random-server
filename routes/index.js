import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  if (req.session.page_views) {
    req.session.page_views++
  } else {
    req.session.page_views = 1;
  }

  res.render('index', { 
    title: 'Express', 
    pageViews: req.session.page_views
  });
});

export default router;
