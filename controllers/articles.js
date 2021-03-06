const Article = require('../models/article');

const { getHttpError, httpStatusCodes } = require('../helpers/http');

function formatArticleForClient(articleFromDb) {
  return {
    _id: articleFromDb._id,
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
  Article.find({ owner: req.user._id })
    .then((articlesFromDb) => {
      const articesForClient = articlesFromDb.map(formatArticleForClient);
      res.send(articesForClient);
    })
    .catch(next);
};

module.exports.handleCreateArticle = (req, res, next) => {
  const { body } = req;

  const newArticle = new Article({
    keyword: body.keyword,
    title: body.title,
    text: body.text,
    date: body.date,
    source: body.source,
    link: body.link,
    image: body.image,
    owner: req.user._id,
  });

  Article.validateUniqueArticlePerOwner(newArticle)
    .then((isValid) => {
      const errorMessage = "For each user, each article's link must be unique.";
      if (!isValid) throw getHttpError(httpStatusCodes.conflict, errorMessage);

      return newArticle.save();
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

  Article.findById(articleId, { owner: true })
    .then((articleFromDb) => {
      if (articleFromDb === null) {
        throw getHttpError(httpStatusCodes.noResourceFound, 'Requested article could not be found.');
      }

      if (articleFromDb.owner.toHexString() !== req.user._id) {
        throw getHttpError(httpStatusCodes.unauthorized, 'Not authorized to delete the given article.');
      }

      return Article.deleteOne({ _id: articleFromDb._id });
    })
    .then(() => {
      res.status(httpStatusCodes.noContentSent).end();
    })
    .catch(next);
};
