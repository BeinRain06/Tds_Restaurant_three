function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({ success: false, error: "The User is not Authorized" });
    console.log(err);
  }
  if (err.name === "ValidationError") {
    res.status(401).json({ success: false, error: err });
    console.log(err);
  }

  res.status(500).json({ success: false, error: err });
}

module.exports = errorHandler;
