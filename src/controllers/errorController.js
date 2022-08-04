module.exports.error404 = function(req, res, next) {
    res.render("404", {
        titlePage: "404: Página não encontrada"
    })
};

module.exports.error403 = function(req, res, next) {
    res.render("403", {
        titlePage: "403: Acesso negado"
    })
};
