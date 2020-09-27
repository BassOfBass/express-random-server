const express = require('express');
const router = express.Router();

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
    new ArticleLink("Task 1", "/forms/form-structure1.html"),
  ]),
  new Article("Basic controls", [
    new ArticleLink("Task 1", "/forms/basic-controls1.html"),
    new ArticleLink("Task 2", "/forms/basic-controls2.html"),
    new ArticleLink("Task 3", "/forms/basic-controls3.html"),
  ]),
  new Article("HTML5 controls", [
    new ArticleLink("Task 1", "/forms/html5-controls1.html"),
    new ArticleLink("Task 2", "/forms/html5-controls2.html"),
  ]),
  new Article("Other controls", [
    new ArticleLink("Tasks", "/forms/other-controls.html"),
  ]),
  new Article("Styling basics", [
    new ArticleLink("Task", "/forms/styling-basics.html")
  ]),
  new Article("Advanced styling", [
    new ArticleLink("Tasks", "/forms/advanced-styling.html"),
  ]),
  new Article("Form validation", [
    new ArticleLink("Tasks", "/forms/form-validation.html"),
  ]),
]

router.get('/', (req, res, next) => {
  res.render("tests", {
    title: "MDN assessments",
    section: "Forms",
    articles: ARTICLES,
  });
});

module.exports = router;