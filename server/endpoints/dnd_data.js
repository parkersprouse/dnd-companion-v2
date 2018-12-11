const _ = require('lodash');

const { respond } = require('./lib');
const { http_ok, http_not_found } = require('../config/constants');

// See: https://goenning.net/2016/04/14/stop-reading-json-files-with-require/ (don't worry about the title of the article)
// Node.js caches files after `require()`ing them for the first time, so it's safe to `require()` them repeatedly in the methods below
module.exports = {
  
  getAll(req, res) {
    const path = req.url.split('/');
    const data_type = path[path.length - 1];
    const data = require(`../json/${data_type}.json`);

    respond(res, http_ok, null, data);
  },

  getSpecific(req, res) {
    const path = req.url.split('/');
    const data_type = path[path.length - 1];
    const data = require(`../json/${data_type}.json`);

    const selected = _.filter(data, req.body);
    if (selected.length > 0)
      return respond(res, http_ok, null, selected);
    respond(res, http_not_found);
  }

}
