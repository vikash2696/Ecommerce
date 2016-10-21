var model = require('../model/addmodel');
//var connection = require('../connection');
var path = require('path');	
var fs = require('fs');
exports.fetchHomePageData = function(req, res) {
    model.fetchHomePageDataForYear(req.params,res);
};
exports.login = function(req, res) {
    res.render('admin/login', {
        title : '',
        errors: '',
    })
};
