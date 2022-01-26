const { S2 } = require('s2-geometry');

const cellUnionToKeys = cellUnion =>
  cellUnion.getCellIds().map(cellId => S2.idToKey(cellId.id.toString()));

module.exports = cellUnionToKeys;
