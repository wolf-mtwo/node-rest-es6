var model = require('../../../components/mongo/model/model')('Article');

exports.model = model.model;
exports.create = model.create;
exports.update = model.update;
exports.remove = model.remove;
exports.show = model.show;
exports.all = model.all;
exports.pagination = model.pagination;
exports.page = model.page;
exports.limit = model.limit;
