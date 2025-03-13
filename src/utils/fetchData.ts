export type Area = [w: number, s: number, e: number, n: number, name: string];
type Authority = "EPSG" | "ESRI" | "IAU_2015" | "IGNF" | "NKG" | "OGC";
type CRSType = "PROJECTED_CRS" | "GEOGRAPHIC_2D_CRS" | "GEOGRAPHIC_3D_CRS" | "GEOCENTRIC_CRS" | "GEODETIC_CRS" | "VERTICAL_CRS" | "COMPOUND_CRS" | "CRS";

export interface CRS {
  area_of_use: Area;
  auth_name: Authority;
  code: string;
  deprecated: boolean;
  name: string;
  projection_method_name: string;
  type: CRSType;
  distance?: number;
}

export type TData = Array<CRS>;

function removeDuplicatedAreas(data: TData) {
  const compArea = (area: Area) => (area[2] - area[0])*(area[3] - area[1]);
  const res = data.reduce((accumulator: TData, current) => {
    const last = accumulator.length == 0 ? {} as CRS : accumulator[accumulator.length - 1];
    if (last.auth_name != current.auth_name || last.code != current.code) {
      accumulator.push(current);
    } else if (compArea(current.area_of_use) > compArea(last.area_of_use)) {
      accumulator[accumulator.length - 1] = current;
    }
    return accumulator;
  }, []);
  return res;
}

async function fetchData() {
  const response = await fetch('https://spatialreference.org/crslist.json');
  let data = await response.json() as TData;
  data = removeDuplicatedAreas(data);
  return data;
}


export default fetchData
