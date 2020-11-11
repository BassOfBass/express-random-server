/**
 * Represents the section in test area.
 */
export class AssessCategory {
  /**
   * @param {string} id
   * @param {string} heading
   * @param {AssessArticle[]} articles
   */
  constructor(id, heading, articles) {
    this.id = id;
    this.heading = heading;
    this.articles = articles;
  }
}

/**
 * Represents an article in test area.
 */
export class AssessArticle {
  /**
   * @param {string} id
   * @param {string} heading 
   * @param {AssessArticleLink[]} links 
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
export class AssessArticleLink {
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