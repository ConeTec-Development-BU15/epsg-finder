import proj4 from "proj4";
import defs from "proj4js-definitions";

proj4.defs(defs);

function convert(code: string, lat: number, lon: number) {
  // Define the source CRS (WGS84, EPSG:4326)
  const sourceCRS = 'EPSG:4326';
  
  // Define the target CRS (replace with the EPSG code you need, e.g., EPSG:3857)
  const targetCRS = `EPSG:${code}`;
  
  // Convert the latitude and longitude to the target CRS
  try {
    const [x, y] = proj4(sourceCRS, targetCRS, [lon, lat]);
    console.debug(`Converted Coordinates: X: ${x}, Y: ${y}`);
    return {x, y};
  } catch (e) {
    console.debug((e as Error));
    return {x: NaN, y: NaN};
  }
}

function getDistance(code: string, lat: number, lon: number, x: number, y: number) {
  const converted = convert(code, lat, lon);
  const deltaX = x - converted.x;
  const deltaY = y - converted.y;
  const distance = Math.hypot(deltaX, deltaY);
  return distance;
}


export default getDistance;
