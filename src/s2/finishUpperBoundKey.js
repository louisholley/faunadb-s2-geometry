const { repeat } = require('lodash');

const finishUpperBoundKey = key => key + repeat('3', 32 - key.length);

module.exports = finishUpperBoundKey;
