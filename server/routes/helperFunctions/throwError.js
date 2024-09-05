/* Throw Custom Error */
module.exports = (message, code) => {
  let error = new Error(message);
  error.status = code;
  throw error;
}
