import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
    {
      name: "Sund",
      uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    },
    {
      name: "Mond",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    },
    {
      name: "Tue",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    },
    {
      name: "Wedn",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    },
    {
      name: "Thurs",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    },
    {
      name: "Fri",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
      },
    {
      name: "Satur",
       uv: 0,
      pv: 0,
      amt: 0,
      cnt: 0
    }
  ];

  
export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="40%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#0001ff" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
