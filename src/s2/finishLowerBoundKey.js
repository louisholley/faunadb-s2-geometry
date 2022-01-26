const { repeat } = require('lodash');

const finishLowerBoundKey = key => key + repeat('0', 32 - key.length);

module.exports = finishLowerBoundKey;
