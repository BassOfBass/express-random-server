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
    new ArticleLink("Task 1", "forms/form-structure"),
  ]),
  new Article("Basic controls", [
    new ArticleLink("Task 1", "forms/basic-controls"),
  ]),
  new Article("HTML5 controls", [
    new ArticleLink("Task 1", "forms/html5-controls"),
  ]),
  new Article("Other controls", [
    new ArticleLink("Tasks", "forms/other-controls"),
  ]),
  new Article("Styling basics", [
    new ArticleLink("Task", "forms/styling-basics")
  ]),
  new Article("Advanced styling", [
    new ArticleLink("Tasks", "forms/advanced-styling"),
  ]),
  new Article("Form validation", [
    new ArticleLink("Tasks", "forms/form-validation"),
  ]),
]

router.get('/', (req, res, next) => {
  res.render("assess", {
    title: "MDN assessments",
    section: "Forms",
    articles: ARTICLES,
  });
});

router.get("/forms", (req, res, next) => {
  res.redirect("/assess");
});

router.get("forms/form-structure", assessController.invokeFormStructure);

module.exports = router;