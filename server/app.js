const cookie_parser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const Sentry = require('@sentry/node');

const config = require('./config');
const controllers = require('./controllers');

// require('./event_system')();

const app = express();

Sentry.init({ dsn: config.sentry_url });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"'
             + ':status :res[content-length] :response-time ms', {
  skip: (req) => req.originalUrl.includes('websocket'),
}));

// Use helmet to protect from a number of vulnerabilities
app.use(helmet());

// Parse application/json
app.use(express.json());

// Set up our cookie parser to sign cookies with our secret
app.use(cookie_parser(config.cookie_secret));

// Setup our controllers under the /api route
app.use('/api', controllers);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

// Always return the main index.html, so vue-router renders the active route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

module.exports = app;
