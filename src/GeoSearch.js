// https://github.com/potatopotaro/faunadb-geo/blob/master/FQL/GeoSearch.js
import { Union } from "faunadb";

import { createCovering, rangeOptimizeKeys, cellUnionToKeys } from "./s2";
import OptimalRead from "./OptimalRead";

const GeoSearch = (indexName, center, radius) => {
  const covering = createCovering(center, radius);
  const sourceRanges = rangeOptimizeKeys(cellUnionToKeys(covering));
  const readExpressions = sourceRanges.map((parentRange) => {
    return OptimalRead(indexName, parentRange);
  });
  return Union(...readExpressions);
};

export default GeoSearch;
