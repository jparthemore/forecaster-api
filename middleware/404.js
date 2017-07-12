const notFound = (req,resp,next)=>{
  resp.status(404).json({
    message: "Cannot find what you are looking for"
  });
};

module.exports = notFound;
