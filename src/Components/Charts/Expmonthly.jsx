import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Jan',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Feb',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Mar',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Apr',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'May',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Jun',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
    {
      name: 'Jul',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
    {
      name: 'Aug',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Sep',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Oct',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Nov',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
    {
      name: 'Dec',
      uv: 1400,
      pv: 680,
      amt: 1700,
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
