// Middleware: Convert username to lowercase and strip HTML tags from comment
function inputCleaner(req, res, next) {
  if (req.body) {
    if (req.body.username && typeof req.body.username === 'string') {
      req.body.username = req.body.username.toLowerCase();
    }
    if (req.body.comment && typeof req.body.comment === 'string') {
      req.body.comment = req.body.comment.replace(/<[^>]*>?/gm, '');
    }
  }
  next();
}

// Middleware: Validate username length
function inputValidator(req, res, next) {
  const username = req.body ? req.body.username : '';
  if (typeof username === 'string' && username.length >= 3) {
    return next();
  }
  return res.redirect('/form?error=Username must be at least 3 characters.');
}

module.exports = {
  inputCleaner,
  inputValidator
};