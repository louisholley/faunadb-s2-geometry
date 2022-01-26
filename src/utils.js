import {
  Length,
  Select,
  Subtract,
  Lambda,
  SubString,
  Map,
  Take,
  Query,
  CreateIndex,
} from "faunadb";
import { filter, get, range } from "lodash";

/* ******* taken from faunadb-geo // faunadb-community-utils ********* */

const StringIndexLength = (string, indexRange = [0, 100]) =>
  Take(
    Subtract(Length(string), indexRange[0] - 1),
    range(indexRange[0], indexRange[1])
  );

const StringPrefixGenerator = (
  string,
  minPrefixLength = 1,
  maxPrefixLength = 100
) =>
  Map(
    StringIndexLength(string, [minPrefixLength, maxPrefixLength + 1]),
    Lambda((prefixLength) => SubString(string, 0, prefixLength))
  );

const CreatePrefixSearchIndex = ({
  fieldSelectPath,
  minPrefixLength,
  maxPrefixLength,
  source,
  terms = [],
  ...restOfCreateIndexParams
}) =>
  CreateIndex({
    source: {
      collection: source.collection ? source.collection : source,
      fields: Object.assign(source.fields ? source.fields : {}, {
        prefixes: Query(
          Lambda((doc) =>
            StringPrefixGenerator(
              Select(fieldSelectPath, doc),
              minPrefixLength,
              maxPrefixLength
            )
          )
        ),
      }),
    },
    terms: [
      ...terms,
      {
        binding: "prefixes",
      },
    ],
    ...restOfCreateIndexParams,
  });

export const CreateGeoSpatialIndex = (
  { SelectPath, minLength = 3, maxLength = 32 },
  index_params
) => {
  if (!SelectPath) throw "Please provide a SelectPath in geohash_params.";

  return CreatePrefixSearchIndex({
    fieldSelectPath: SelectPath,
    minPrefixLength: minLength,
    maxPrefixLength: maxLength,
    ...index_params,
    values: [
      { field: SelectPath },
      ...filter(
        get(index_params, "values", []),
        (v) => get(v, "field") !== SelectPath
      ),
    ],
  });
};
