import { Area, CRS, TData } from "./fetchData";

interface MapBox {
  w: number;
  s: number;
  e: number;
  n: number;
}

function prepareFilterFromDoc(lat: number, lon: number) {
  const res = {
    "types": {
      "PROJECTED_CRS": true,
      "GEOGRAPHIC_2D_CRS": false,
      "GEOGRAPHIC_3D_CRS": false,
      "GEOCENTRIC_CRS": false,
      "GEODETIC_CRS": false,
      "VERTICAL_CRS": false,
      "COMPOUND_CRS": false,
      "CRS": false
    },
    "allowDeprecated": false,
    "ignoreWorld": false,
    "authorities": {
      "EPSG": true,
      "ESRI": false,
      "IAU_2015": false,
      "IGNF": false,
      "NKG": false,
      "OGC": false
    },
    "map_box": {w: lon, s: lat, e: lon, n: lat},
    "str": ""
  };
  return res;
}

function splitSearchStrByOr(str: string) {
  str = str.toLowerCase();
  const ors = str.match(/([^|]+)/g);
  return ors;
}

function numericCode(str: string) {
  const number = str.match(/^\s*([1-9]\d*)\s*$/);
  if (number && number.length == 2) {
    return number[1];
  }
  return null;
}

function numericCodes(str: string) {
  const ors = splitSearchStrByOr(str) ?? [];
  const r = ors.map(e => numericCode(e)).filter(e => e);
  return r;
}

function intersects(box1: MapBox, box2: MapBox) {
  if (box1.n < box2.s || box2.n < box1.s) {
    return false;
  }
  if (box1.w <= box1.e && box2.w <= box2.e) {
    return Math.max(box1.w, box2.w) <= Math.min(box1.e, box2.e);
  } else if (box1.w > box1.e && box2.w > box2.e) {
    return true;
  } else {
    return box2.w <= box1.e || box1.w <= box2.e;
  }
}

function intersectsWithMapBox(map_box: MapBox, area_of_use: Area) {
  if (map_box) {
    const box2 = {w:area_of_use[0], s:area_of_use[1], e:area_of_use[2], n:area_of_use[3]};
    const use = intersects(map_box, box2);
    return use;
  }
  return true;
}


function validSearchStr(crs: CRS, str: string) {
  if (!str) return true;
  
  const crs_name = crs.name.toLowerCase();
  const ors = splitSearchStrByOr(str) ?? [];

  for (let i = 0; i < ors.length; i++) {
    const or = ors[i];
    const pieces = or.match(/(-?".*?"|[^"\s]+)(?=\s*|\s*$)/g) ?? [];
    const valid_pieces = pieces.map(x => {
      let negate = false;
      if (x.charAt(0) == '-') {
        x = x.substring(1);
        negate = true;
      }
      x = x.replaceAll('"', '');
      return crs_name.includes(x) != negate;
    })
    if (valid_pieces.every(Boolean)) return true;
  }
  return false;
}

function filterData(data: TData, lat: number, lon: number) {
  const filters = prepareFilterFromDoc(lat, lon);
  const codes = numericCodes(filters.str);
  const filteredData = data.filter(crs => {
    if (codes.includes(crs.code)) {
      return true;
    } else if (!filters.types[crs.type]) {
      return false;
    } else if (!filters.authorities[crs.auth_name]) {
      return false;
    } else if (!filters.allowDeprecated && crs.deprecated) {
      return false;
    } else if (filters.ignoreWorld && crs.area_of_use[0] == -180 && crs.area_of_use[2] == 180) {
      return false;
    } else if (!intersectsWithMapBox(filters.map_box, crs.area_of_use)) {
      return false;
    } else if (!validSearchStr(crs, filters.str)) {
      return false;
    }
    return true;
  });
  return filteredData;
}


export default filterData;
