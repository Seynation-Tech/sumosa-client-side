import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import "./Graph.css";
  import React, { useState, useContext, useEffect } from "react";
  import axios from "axios";
  import { AuthContext } from "../AuthContext";
  
  const url = "http://localhost:5001";
  
  const dats = [
    {
      name: "Sund",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Mond",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Tue",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Wedn",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Thurs",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Fri",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
    {
      name: "Satur",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0,
    },
  ];
  
  export default function Mids() {
    
    const { url, dats } = useContext( AuthContext );
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={660}
          height={400}
          data={dats}
          margin={{
            top: 10,
            right: 20,
            left: -9,
            bottom: -4,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#6bc6f4"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#a900fe"
          />
          {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  