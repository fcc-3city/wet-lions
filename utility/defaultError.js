module.exports = function (error) {
  if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    // console.log(error.response.data)
    console.warn(error.response.status, error.response.headers.date, error.config.url)
  } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    console.warn(error.request.status, error.config.url)
  } else {
      // Something happened in setting up the request that triggered an Error
    console.warn('Error', error.message)
  }
  // console.warn()
}
