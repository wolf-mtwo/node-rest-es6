import ArticleService from './article-service';

let articleService = new ArticleService();

export default class ArticlesHelper {

  static create(req, res, next) {
    articleService.create(req, res, next);
  }
}
