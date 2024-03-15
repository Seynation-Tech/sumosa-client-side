import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sun',
    uv: 400000000/10000000,
    pv: 24000000/10000000,
    amt: 24000000/10000000,
  },
  {
    name: 'Mon',
    uv: 30000000/10000000,
    pv: 13900008/10000000,
    amt: 22000010/10000000,
  },
  {
    name: 'Tue',
    uv: 20000000/10000000,
    pv: 98000000/10000000,
    amt: 22900000/10000000,
  },
  {
    name: 'Wed',
    uv: 270000080/10000000,
    pv: 39000008/10000000,
    amt: 20000000/10000000,
  },
  {
    name: 'Thur',
    uv: 18900000/10000000,
    pv: 4800000/10000000,
    amt: 21000081,
  },
  {
    name: 'Fri',
    uv: 23900000/10000000,
    pv: 380000000/10000000,
    amt: 250000000/10000000,
  },
  {
    name: 'Sart',
    uv: 340000090/10000000,
    pv: 43000000/10000000,
    amt: 210000000/10000000,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={660}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -29,
            bottom: -4,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
