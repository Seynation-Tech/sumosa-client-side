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
    name: 'Morning',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {

    uv: 868,
    pv: 967,
    amt: 1506,
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
          <XAxis dataKey="name" label={{ value: 'Evening', position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{ value: 'Amount (appr.10k)', angle: -90, position: 'insideright' }}  />
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
