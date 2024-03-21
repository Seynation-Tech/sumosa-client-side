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
    Ago: 590,
    Pms: 800,
    Sales: 1400,
  },
  {
  
    Ago: 1590,
    Pms: 1800,
    Sales: 400,
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
          <YAxis  />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Pms" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Ago" barSize={50} fill="#413ea0" />
          <Line type="monotone" dataKey="Sales" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
