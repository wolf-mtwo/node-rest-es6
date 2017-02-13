import Article from './article';

export default class Controller {

  constructor() {
    this.model = new Article();
  }

  create(item) {
    return this.model.create(item);
  }
}
