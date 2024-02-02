export const handleApiError = (err) => {
  console.log(err.message);
  let message = "";
  if (err.response) {
    if (err.response.data.errors) {
      // If the API response contains an 'errors' array
      const error = err.response.data.errors[0];
      const message = error.msg || "An error occurred"; // Use the error message or a generic message
      return message;
    } else if (err.response.data.message) {
      message = err.response.data.message;
      return message;
    } else if (err.response.status == 401) {
      message = "Your session has expired. Please log in again";
      return message;
    } else {
      message = err.message;
      return message;
    }
  } else {
    return err;
  }
};
