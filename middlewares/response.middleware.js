const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res?.is404) {
    res.status(404).json({ error: true, message: res.message });
  } else if (res?.is400) {
    res.status(400).json({ error: true, message: res.message });
  } else res.status(200).json(res.data);

  next();
};

exports.responseMiddleware = responseMiddleware;
