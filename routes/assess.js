const express = require('express');
const router = express.Router();

const assessController = require("../controllers/assessController");

/**
 * Represents an article in test area.
 */
class Article {
  /**
   * 
   * @param {string} heading 
   * @param {ArticleLink[]} links 
   */
  constructor(heading, links) {
    this.heading = heading;
    this.links = links;
  }
}

/**
 * Represents a link of article.
 */
class ArticleLink {
  /**
   * 
   * @param {string} title 
   * @param {string} href 
   */
  constructor(title, href) {
    this.title = title;
    this.href = href;
  }
}

const ARTICLES = [
  new Article("Form structure", [
    new ArticleLink("Task 1", "assess/forms/form-structure"),
  ]),
  new Article("Basic controls", [
    new ArticleLink("Task 1", "assess/forms/basic-controls"),
  ]),
  new Article("HTML5 controls", [
    new ArticleLink("Task 1", "assess/forms/html5-controls"),
  ]),
  new Article("Other controls", [
    new ArticleLink("Tasks", "assess/forms/other-controls"),
  ]),
  new Article("Styling basics", [
    new ArticleLink("Task", "assess/forms/styling-basics")
  ]),
  new Article("Advanced styling", [
    new ArticleLink("Tasks", "assess/forms/advanced-styling"),
  ]),
  new Article("Form validation", [
    new ArticleLink("Tasks", "assess/forms/form-validation"),
  ]),
]

router.get('/', (req, res, next) => {
  res.render("assess", {
    title: "MDN assessments",
    section: "Forms",
    articles: ARTICLES,
  });
});

router.get("/:section/:article", (req, res, next) => {
  res.render(`${req.params.section}/${req.params.article}`);
});

module.exports = router;