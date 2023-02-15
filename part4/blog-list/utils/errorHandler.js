const errorHandler = (err, request, response, next) => {
  console.log('error detected');
    if (err.name === "ValidationError") {
      return response.status(400).json({error: `Validation error: ${err.message}`})
      }
    if (err.name === "JsonWebTokenError") {
      return response.status(400).json({error: `Token ${request.token} gave error: ${err.message}`})
    }
    console.log(`Warning: uncaught error ${err.name}`);
    return response.status(400).json({error: err})
}

module.exports = errorHandler