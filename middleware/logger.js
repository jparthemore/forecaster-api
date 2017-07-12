const logger = (req, resp, next)=>{
  const url = req.url;
  const method = req.method;
  const now = new Date();
  const msg = `${method}: ${url} - ${now}`;

  console.log(msg); //goes to stdout
  next();
};

module.exports = logger;
