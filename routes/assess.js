import express from 'express';
// import fs from "fs/promises";
import assessController from "../controllers/assessController.js";
import { returnAbsoluteHREFServer } from "../libraries/utils/absoluteURL.js"
import { AssessCategory, 
  AssessArticle, 
  AssessArticleLink 
} from "../libraries/types/AssessArticles.js";

const router = express.Router();
/**
 * @type AssessCategory[]
 */
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
    new AssessArticle("accesscssjs", "CSS and JavaScript accessibility", [
      new AssessArticleLink("CSS/JS accessibility tasks", "/assess/accessibility/css-js-accessibility")
    ]),
    new AssessArticle("waiaria", "WAI-ARIA", [
      new AssessArticleLink("WAI-ARIA tasks", "/assess/accessibility/wai-aria-ass")
    ]),
    new AssessArticle("acctroubles", "Accessibility troubleshooting", [
      new AssessArticleLink("Accessibility task", "/assess/accessibility/troubleshooting")
    ])
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

router.get("/wai-aria", (req, res, next) => {
  res.render("assess/accessibility/wai-aria", {
    title: "WAI-ARIA example"
  })
});

router.get("/acc-tables", (req, res) => {
  res.render("assess/accessibility/acc-tables", {
    title: "A Responsive Accessible Table"
  });
});

router.get("/client-frameworks", (req, res) => {
  res.render("assess/frameworks", { 
    title: "Client-side frameworks",
    absoluteURL: returnAbsoluteHREFServer(req)
  });
});

router.get("/client-frameworks/:id", (req, res, next) => {

  switch (req.params.id) {

    case "vanilla":
      res.render(`assess/client-frameworks/${req.params.id}`, {
        title: "Vanilla DOM Todo List"
      });
      break;

    case "react":
      res.render(`assess/client-frameworks/${req.params.id}`, {
        title: "React Todo List"
      });
      break

    case "":
      res.send();
      break;
    
    case "":
      res.send();
      break;
    
    default:
      next();
      break;
  }

  
});

router.get("/:section/:article", async (req, res, next) => {
  res.render(`assess/${req.params.section}/${req.params.article}`, { 
    absoluteURL: returnAbsoluteHREFServer(req)
  });
});

export default router;