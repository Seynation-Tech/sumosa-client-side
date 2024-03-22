import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import "./Graph.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const datas = [
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
  

   const { url, datas } = useContext( AuthContext );

   console.log(datas)

    return (
      <ResponsiveContainer width="110%" height="40%">
        <ComposedChart
          width={500}
          height={400}
          data={datas}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="Diesel" label={{ value: 'Days', position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{  angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Diesel" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Diesel" barSize={50} fill="#413ea0" />
          {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  
}
