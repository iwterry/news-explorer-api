const Article = require('../models/article');

function formatArticleForClient(articleFromDb) {
  return {
    keyword: articleFromDb.keyword,
    title: articleFromDb.title,
    text: articleFromDb.text,
    date: articleFromDb.date,
    source: articleFromDb.source,
    link: articleFromDb.link,
    image: articleFromDb.image,
  };
}

module.exports.handleGetArticles = (req, res, next) => {
  // temp solution before adding authentication
  req.user = { _id: '6120bf8b108e9c1798bdefbb' };

  Article.find({ owner: req.user._id })
    .then((articlesFromDb) => {
      const articesForClient = articlesFromDb.map(formatArticleForClient);
      res.send(articesForClient);
    })
    .catch(next);
};

module.exports.handleCreateArticle = (req, res, next) => {
  const { body } = req;

  // temp solution before adding authentication
  req.user = { _id: '6120bf8b108e9c1798bdefbb' };

  Article.create({
    keyword: body.keyword,
    title: body.title,
    text: body.text,
    date: body.date,
    source: body.source,
    link: body.link,
    image: body.image,
    owner: req.user._id,
  })
    .then((articleFromDb) => {
      const RESOURCE_CREATED_STATUS_CODE = 201;
      res
        .status(RESOURCE_CREATED_STATUS_CODE)
        .send(formatArticleForClient(articleFromDb));
    })
    .catch(next);
};

module.exports.handleDeleteArticle = (req, res, next) => {
  const { id: articleId } = req.params;

  // temp solution before adding authentication
  req.user = { _id: '6120bf8b108e9c1798bdefbb' };

  Article.findById(articleId, { owner: true })
    .then((articleFromDb) => {
      if (articleFromDb === null) {
        const NO_RESOURCE_FOUND_STATUS_CODE = 404;
        const err = new Error('Requested article could not be found.');
        err.httpStatusCode = NO_RESOURCE_FOUND_STATUS_CODE;
        throw err;
      }

      if (articleFromDb.owner.toHexString() !== req.user._id) {
        const FORBIDDEN_STATUS_CODE = 403;
        const err = new Error('Not authorized to view the given article.');
        err.httpStatusCode = FORBIDDEN_STATUS_CODE;
        throw err;
      }

      return Article.deleteOne({ _id: articleFromDb._id });
    })
    .then(() => {
      const NO_CONTENT_STATUS_CODE = 204;
      res
        .status(NO_CONTENT_STATUS_CODE)
        .end();
    })
    .catch(next);
};
