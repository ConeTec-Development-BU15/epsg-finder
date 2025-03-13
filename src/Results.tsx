import getFormInput from "./getFromInput";



function Results({url}: {url: string}) {
  if (!url) return (
    <p>No results.</p>
  );
  
  const lat = getFormInput('latitude');
  const lon = getFormInput('longitude');
  const spatialReferenceURL = `https://spatialreference.org/explorer.html?latlng=${lat},${lon}&ignoreWorld=false&allowDeprecated=false&authorities=EPSG&activeTypes=PROJECTED_CRS`;
  return (
    <>
      <iframe id="results" width="100%" height="800" src={url} />
      <h2 className="my-4">Resources</h2>
      <div className="overflow-x-auto">
        <a className="d-block mb-3" target="_blank" href={spatialReferenceURL}>{spatialReferenceURL}</a>
        <a className="d-block mb-3" target="_blank" href="http://projfinder.com/">http://projfinder.com/</a>
      </div>
    </>
  );
}


export default Results;
