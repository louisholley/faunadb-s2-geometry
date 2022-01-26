const { S2LatLng, S2RegionCoverer, S2CellUnion, Utils } = require('nodes2ts');

const createCovering = (center, radius) => {
  const regionCoverer = new S2RegionCoverer();
  const cellUnion = new S2CellUnion();
  cellUnion.initFromIds(
    regionCoverer
      .getInteriorCoveringCells(
        Utils.calcRegionFromCenterRadius(
          S2LatLng.fromDegrees(center.lat, center.lon),
          radius / 1000
        )
      )
      .map(cell => cell.id)
  );
  return cellUnion;
};

module.exports = createCovering;
