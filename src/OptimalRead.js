// https://github.com/potatopotaro/faunadb-geo/blob/master/FQL/OptimalRead.js
import { Match, Index, Range } from "faunadb";

import { finishUpperBoundKey, finishLowerBoundKey } from "./s2";

const OptimalRead = (indexName, range) =>
  range.length > 1
    ? Range(
        Match(Index(indexName), range[0].slice(0, -1)),
        finishLowerBoundKey(range[0]),
        finishUpperBoundKey(range[range.length - 1])
      )
    : Match(Index(indexName), range[0]);

export default OptimalRead;
