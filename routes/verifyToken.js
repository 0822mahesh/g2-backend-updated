const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //console.log(req);
  //console.log(req.headers);
  //console.log(req.authorization);
  console.log(req.headers.authorization);
  //const authHeader = req.headers.token;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //spliting the token because Bearer while passing token in header.
    jwt.verify(token, process.env.JWT_CODE, (err, user) => {
      if (err) res.status(401).json("Token not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to perform update action");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthentication };
