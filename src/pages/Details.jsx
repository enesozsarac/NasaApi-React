import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

function Details() {
  const urlParams = new URLSearchParams(window.location.search);
  const neoId = urlParams.get("id");
  const apiKey = "EvOy379k0na8Kry3SPfcexg78hvYFV3eMATXxIjX";
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${apiKey}`;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  console.log(neoId);

  // const fetchNeoDetails = async () => {
  //   const response = await axios.get(apiUrl);
  //   setData(response.data);
  //   console.log(data);
  // };

  const fetchNeoDetails = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching the NEO details", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchNeoDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90dvh]">
        <div className="border-solid border-4 bg border-sky-500 p-16 rounded-[50px] bg-black bg-opacity-30 text-white">
          <h1>
            <Loader></Loader>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[90dvh]">
      <div className="border-solid border-4 bg border-sky-500 p-16 rounded-[50px] bg-black bg-opacity-30   tew">
        <h1>Name: {data.name}</h1>
        <p>
          Close Approach Date:{" "}
          {data ? data.close_approach_data[0].close_approach_date : data}
        </p>
        <p>
          Estimated Diameter:{" "}
          {data
            ? data.estimated_diameter.kilometers.estimated_diameter_min
            : data}{" "}
          -{" "}
          {data
            ? data.estimated_diameter.kilometers.estimated_diameter_max
            : data}
        </p>
        <p>
          Relative Velocity:{" "}
          {data
            ? data.close_approach_data[0].relative_velocity.kilometers_per_hour
            : data}{" "}
          km/h
        </p>
        <p>
          Miss Distance:{" "}
          {data ? data.close_approach_data[0].miss_distance.kilometers : data}{" "}
          km
        </p>
      </div>
    </div>
  );
}

export default Details;
