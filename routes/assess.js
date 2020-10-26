import express from 'express';
import assessController from "../controllers/assessController.js";

const router = express.Router();

/**
 * Represents an article in test area.
 */
class Article {
  /**
   * @param {string} id
   * @param {string} heading 
   * @param {ArticleLink[]} links 
   */
  constructor(id, heading, links) {
    this.id = id;
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
  new Article("formstruc", "Form structure", [
    new ArticleLink("Task 1", "assess/forms/form-structure"),
  ]),
  new Article("formbasic", "Basic controls", [
    new ArticleLink("Task 1", "assess/forms/basic-controls"),
  ]),
  new Article("formhtml5", "HTML5 controls", [
    new ArticleLink("Task 1", "assess/forms/html5-controls"),
  ]),
  new Article("formother", "Other controls", [
    new ArticleLink("Tasks", "assess/forms/other-controls"),
  ]),
  new Article("formstyling", "Styling basics", [
    new ArticleLink("Task", "assess/forms/styling-basics")
  ]),
  new Article("formadvstyling", "Advanced styling", [
    new ArticleLink("Tasks", "assess/forms/advanced-styling"),
  ]),
  new Article("formvalid", "Form validation", [
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
  res.render(`assess/${req.params.section}/${req.params.article}`);
});

export default router;