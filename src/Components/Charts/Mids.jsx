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

const datas = [
  {
    name: "Sun",
    uv: 0,
    pv: 0,
    amt: 0,
    cnt: 0,
  },
  {
    name: "Mon",
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
    name: "Wed",
    uv: 0,
    pv: 0,
    amt: 0,
    cnt: 0,
  },
  {
    name: "Thur",
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
    name: "Sat",
    uv: 0,
    pv: 0,
    amt: 0,
    cnt: 0,
  },
];

export default function Mids() {
  
  const { url, datas } = useContext( AuthContext );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={660}
        height={400}
        data={datas}
        margin={{
          top: 10,
          right: 20,
          left: -9,
          bottom: -4,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"  tick={{ fontSize: 10 }} />
        <YAxis  tick={{ fontSize: 10 }}  />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Diesel"
          stackId="1"
          stroke="#8884d8"
          fill="#4b03fc"
        />
        <Area
          type="monotone"
          dataKey="Petrol"
          stackId="1"
          stroke="#fc9d00"
          fill="#fe00fe"
        />
        {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
