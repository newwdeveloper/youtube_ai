function errorHandling(err, req, res, next) {
  console.error("Error Details:", {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: err.stack,
  });
  if (err.code === 11000) {
    return res.status(400).json({ error: "email already exist" });
  }
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map(
      (error) => error.message
    );
    console.log(validationErrors);
    return res.status(400).json({ error: validationErrors.join(", ") });
  }
  res.status(500).json({ error: "Server error" });
}

export default errorHandling;
