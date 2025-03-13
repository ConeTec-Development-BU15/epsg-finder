import getFormInput from "./getFromInput";

function findEPSG() {
  const limit = 3;
  
  const lat = getFormInput('latitude');
  const lon = getFormInput('longitude');
  const y = getFormInput('northing');
  const x = getFormInput('easting');
  
  if (!(lat && lon && y && x)) {
    console.log(lat, lon, x, y);
    return;
  }
  
  const params = new URLSearchParams();
  params.append('ref_lat', lat);
  params.append('ref_lon', lon);
  params.append('unknown_y', y);
  params.append('unknown_x', x);
  params.append('limit', limit.toString());
  const url = "http://api.projfinder.com/api/projfinder?" + params.toString();
  
  return url;
}


export default findEPSG;
