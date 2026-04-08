export const notFound = (req, res) => {
  return res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({ message: error.message || 'Internal server error' });
};
