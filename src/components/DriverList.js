import React from "react";
import { Link } from "react-router-dom";

const DriverList = ({ data }) => {

  return (
    <div>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h4>Total New Drivers</h4>
        <span>0</span>
      </div>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h4>Active Drivers</h4>
        <span>0</span>
      </div>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h4>Total Drivers</h4>
        <span>0</span>
      </div>
      <Link to="/add-driver" >
        <button className="btn btn-success" type="submit">Add New Driver</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Identity No</th>
            <th scope="col">Nationality</th>
            <th scope="col">Driver Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">External coustmerId</th>
            <th scope="col">Card Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr>
                <td>{data.workStatus}</td>
                <td>{data.identificationNo}</td>
                <td>{data.nationality}</td>
                <td>{data.Fname}</td>
                <td>{data.Mobilenumber}</td>
                <td>{data.identificationType}</td>
                <td>xxxx xxxx xxxx x098</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DriverList;
