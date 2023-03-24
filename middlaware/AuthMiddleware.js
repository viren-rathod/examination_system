
var session = require('express-session')


let verifyToken = async (req, res, next) => {

  const token =
  req.session.stdId;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
};

module.exports = verifyToken;



