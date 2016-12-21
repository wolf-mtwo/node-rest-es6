import Service from '../../../components/adapter/service';
import Article from './article';

export default class ArticleService extends Service {

  constructor() {
    super(new Article());
  }
}
