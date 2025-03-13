import { Table } from "react-bootstrap";
import { useAppContext } from "./AppContext";
import filterData from "../utils/filterData";
import getDistance from "../utils/getDistance";
import { CRS } from "../utils/fetchData";


function Results() {
  const { lat, lon, x, y, data } = useAppContext();
  
  if (!(lat && lon && y && x)) return (
    <p>Waiting for input...</p>
  );
  
  if (!data) return (
    <p>Loading data...</p>
  );
  
  const filteredData = filterData(data, lat, lon);
  const results = filteredData.map<Required<CRS>>(crs => ({
    distance: getDistance(crs.code, lat, lon, x, y),
    ...crs,
  })).filter(crs => !isNaN(crs.distance));
  
  const sortedResults = results.sort((a, b) => a.distance - b.distance);
  
  if (!filteredData.length) return (
    <p>No results found.</p>
  );
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>EPSG</th>
          <th>Name</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {sortedResults.map((crs, i) => (
          <tr key={crs.name}>
            <td>{i+1}</td>
            <td>{crs.code}</td>
            <td>{crs.name}</td>
            <td>{crs.distance.toFixed()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}


export default Results;
