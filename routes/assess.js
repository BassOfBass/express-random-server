import express from 'express';
import assessController from "../controllers/assessController.js";
import { returnAbsoluteHREFServer } from "../libraries/utils/absoluteURL.js"
import { AssessCategory, 
  AssessArticle, 
  AssessArticleLink 
} from "../libraries/types/AssessArticles.js";

const router = express.Router();
const MDNASSDB = [
  new AssessCategory("forms", "Forms", [
    new AssessArticle("formstruc", "Form structure", [
      new AssessArticleLink("Task 1", "assess/forms/form-structure"),
    ]),
    new AssessArticle("formbasic", "Basic controls", [
      new AssessArticleLink("Task 1", "assess/forms/basic-controls"),
    ]),
    new AssessArticle("formhtml5", "HTML5 controls", [
      new AssessArticleLink("Task 1", "assess/forms/html5-controls"),
    ]),
    new AssessArticle("formother", "Other controls", [
      new AssessArticleLink("Tasks", "assess/forms/other-controls"),
    ]),
    new AssessArticle("formstyling", "Styling basics", [
      new AssessArticleLink("Task", "assess/forms/styling-basics")
    ]),
    new AssessArticle("formadvstyling", "Advanced styling", [
      new AssessArticleLink("Tasks", "assess/forms/advanced-styling"),
    ]),
    new AssessArticle("formvalid", "Form validation", [
      new AssessArticleLink("Tasks", "assess/forms/form-validation"),
    ]),
  ]),
  new AssessCategory("accessibility", "Accessibility", [
    new AssessArticle("accesshtml", "HTML accessibility", [
      new AssessArticleLink("HTML accessibility tasks", "/assess/accessibility/html-accessibility")
    ]),
  ]),
]

router.get('/', (req, res, next) => {
  res.render("assess", {
    title: "MDN assessments",
    mdnassDB: MDNASSDB,
    absoluteURL: returnAbsoluteHREFServer(req),
  });
});

router.get("/learn", (req, res, next) => {
  res.render("assess/learn", {
    title: "learning area",
  });
});

router.post("/learn", (req, res, next) => {
  
});

router.get("/postcard", (req, res, next) => {
  res.render("assess/forms/postcard", { title: "Postcard" });
});

router.get("/:section/:article", (req, res, next) => {
  res.render(`assess/${req.params.section}/${req.params.article}`, { 
    absoluteURL: returnAbsoluteHREFServer(req)
  });
});

export default router;