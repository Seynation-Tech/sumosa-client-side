import React, { PureComponent } from 'react';
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

const data = [
  {
    name: 'Sun',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Mon',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Tue',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Wed',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Thur',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Fri',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: 'Sart',
    uv: 1400,
    pv: 680,
    amt: 1700,
  }
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="110%" height="40%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" label={{ value: 'Days', position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{ value: 'Amount (10k)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={50} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
