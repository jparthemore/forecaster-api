const errorHandler = (err,request,response,next)=>{
  response.status(500).json({
    message: 'oh no - something broke..'
  });
};

module.exports = errorHandler;
