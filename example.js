import { Paginate } from "faunadb";
import GeoSearch from "./src/GeoSearch";
import { CreateGeoSpatialIndex } from "./src/utils";

const geohashParams = {
  SelectPath: ["data", "mapLocation", "geohash"],
};

const regularIndexParams = {
  name: "jobs_by_geohash",
  source: Collection("jobs"),
  values: [
    { field: ["ref"] },
    { field: ["data", "mapLocation", "location", "lat"] },
    { field: ["data", "mapLocation", "location", "lon"] },
  ],
};

export const ExampleIndex = CreateGeoSpatialIndex(
  geohashParams,
  regularIndexParams
);

export const ExampleQuery = (lat, lon) => Paginate(
  GeoSearch(
   'jobs_by_geohash',
    { lat, lon }, // coords
    40000 // radius in meters
  )
),