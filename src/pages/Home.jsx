import React, { Component, useEffect, useState } from "react";
import DatePickerValue from "../components/DatePicker";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [startDateValue, setStartDateValue] = React.useState(null);
  const [endDateValue, setEndDateValue] = React.useState(null);
  const apiKey = "EvOy379k0na8Kry3SPfcexg78hvYFV3eMATXxIjX";
  const [totalNeo, setTotalNeo] = React.useState("");
  const [data, setData] = React.useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateValue}&end_date=${endDateValue}&api_key=${apiKey}`
    );
    const test = response.data;
    setData(Object.values(test.near_earth_objects).flat());
    setTotalNeo(test.element_count);
  };

  const fetchNEOData = () => {
    if (startDateValue && endDateValue) {
      fetchData();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Select start and end date",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (startDateValue && endDateValue) {
      fetchData();
    }
  }, [startDateValue]);

  window.addEventListener("beforeunload", function () {
    sessionStorage.clear();
  });

  return (
    <>
      <DatePickerValue
        setStartDateValue={setStartDateValue}
        setEndDateValue={setEndDateValue}
      />
      <div className="mt-8">
        <Button variant="contained" onClick={fetchNEOData}>
          Fetch Neo Data
        </Button>
      </div>
      <p className="mt-3">Total NEOs: {totalNeo}</p>

      <div className="grid grid-cols-3 gap-3">
        {data ? (
          data.map((neo, index) => {
            return (
              <div
                className={
                  neo.is_potentially_hazardous_asteroid
                    ? `border-solid border-2 bg border-red-500 mt-5 rounded-[10px] pt-2`
                    : `border-solid border-2 bg border-sky-500 mt-5 rounded-[10px] pt-2`
                }
                key={index}
              >
                <h2>{neo.name}</h2>
                <p>{neo.id}</p>
                <Link to={`details?id=${neo.id}`}>
                  <button
                    className={
                      neo.is_potentially_hazardous_asteroid
                        ? `rounded-[10px] p-2 m-2 bg-red-500  hover:bg-red-300 `
                        : `rounded-[10px] p-2 m-2 bg-sky-400 text-white  hover:bg-sky-300 hover:text-black`
                    }
                  >
                    Details
                  </button>
                </Link>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default App;
