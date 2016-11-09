import model from '../../../components/mongo/model/model';
let controller = model('Article');

exports.model = controller.model;
exports.create = controller.create;
exports.update = controller.update;
exports.remove = controller.remove;
exports.show = controller.show;
exports.all = controller.all;
exports.pagination = controller.pagination;
exports.page = controller.page;
exports.limit = controller.limit;
