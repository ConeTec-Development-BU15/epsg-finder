import { useAppContext } from "./AppContext";


function Resources() {
  const ctx = useAppContext();
  const spatialReferenceURL = `https://spatialreference.org/explorer.html?latlng=${ctx.lat},${ctx.lon}&ignoreWorld=false&allowDeprecated=false&authorities=EPSG&activeTypes=PROJECTED_CRS`;
  return (
    <ul className="pb-5">
      <li><a target="_blank" href={spatialReferenceURL}>SpatialReference.org</a></li>
      <li><a target="_blank" href="http://projfinder.com/">ProjFinder</a></li>
    </ul>
  );
}


export default Resources;
