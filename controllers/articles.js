const Article = require('../models/article');

const { getHttpError, httpStatusCodes } = require('../helpers/http');

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
      res
        .status(httpStatusCodes.resourceCreated)
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
        throw getHttpError(httpStatusCodes.noResourceFound, 'Requested article could not be found.');
      }

      if (articleFromDb.owner.toHexString() !== req.user._id) {
        throw getHttpError(httpStatusCodes.unauthorized, 'Not authorized to view the given article.');
      }

      return Article.deleteOne({ _id: articleFromDb._id });
    })
    .then(() => {
      res.status(httpStatusCodes.noContentSent).end();
    })
    .catch(next);
};
