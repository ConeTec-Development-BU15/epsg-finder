// import * as maptilerClient from '@maptiler/client';


function getFormInput(id: string) {
  const element = document.getElementById(id)! as HTMLInputElement;
  return Number.parseFloat(element.value).toString();
}


async function findEPSG() {
  const limit = 3;
  // const apiKey = getFormValue("api-key");
  // const result = await maptilerClient.geocoding.reverse([-75.432628, 40.044438], {apiKey, limit});
  // const url = "http://api.projfinder.com/api/projfinder?ref_lon="+$("#xcoord").html()+"&ref_lat="+$("#ycoord").html()+"&unknown_x="+$("#xtxt").val()+"&unknown_y="+$("#ytxt").val()+"&limit=10";
  
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
  console.log(url);
  
  try {
    const response = await fetch(url, {
      // mode: 'no-cors',
      method: 'GET',
      cache: 'reload',
      // credentials: 'include',
      headers: {
        'upgrade-insecure-requests': '1',
        'Access-Control-Allow-Origin': "*",
        // 'Cookie': '_ga=GA1.2.169743073.1741809994; _gid=GA1.2.1673069297.1741809994; _ga_QMZPXR0GJL=GS1.2.1741809995.1.1.1741810193.0.0.0',
      }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error((error as Error).message);
  }
  
}


export default findEPSG;
