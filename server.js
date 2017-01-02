import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import proxy from 'express-http-proxy';

// Middleware to add url to req context (req.url)
const addForwardUrlToRequest = (req, res, next) => {
  if (!req.params.url) {
    const noForwardUrlFoundError= new Error('No URL found to forward to');
    noForwardUrlFoundError.status = 400;
    next(noForwardUrlFoundError);
  }
  const encodedUrl = req.params.url;
  const url = decodeURI(encodedUrl);
  req.url = url;
  next();
};

// Middleware to proxy request -- found on req.url
const proxyRequest = (req, res, next) => {
  const { url } = req;
  proxy(url)(req, res, next);
};

// Config express server
const app = express();
app.use(logger('common'));
app.use(helmet());
app.use(cors());

// Add routes
// - Healthcheck Route
app.get('/healthcheck', (req, res) => res.sendStatus(200));
// - URL Forwarding Route
app.get('/fwd/:url', addForwardUrlToRequest, proxyRequest);

// 404 (Last route assuming we didn't hit any of the others.)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler -- Note this leak the stack trace.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error,
  });
});

export default app;
