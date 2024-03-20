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
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  
  const url = "http://localhost:5001";
  
  const data = [
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
    const [list, setList] = useState(data);
    const [day, setDays] = useState({
      mond: "",
      tue: "",
      wed: "",
      thurs: "",
      fri: "",
      satur: "",
      sun: "",
    });
  
    const [datas, setDatas] = useState([
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
    ]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const fetchData = async () => {
          try {
            const rs = await axios.get(`${url}/api/weeklydatas`, {
              withCredentials: true,
            });
  
            for (let i = 0; i < rs.data.length; i++) {
              console.log(rs.data[i].uid === "tuesday");
  
              setDatas([
                {
                  name: "Sund",
                  uv: (rs.data[i].uid === "sunday")?rs.data[i].uid:0,
                  pv: (rs.data[i].uid === "sunday")?rs.data[i].uid:0,
                  amt: (rs.data[i].uid === "sunday")?rs.data[i].uid:0,
                  cnt: 0,
                },
                {
                  name: "Mond",
                  uv: rs.data.monday,
                  pv: rs.data.monday,
                  amt: rs.data.monday,
                  cnt: 0,
                },
                {
                  name: "Tue",
                  uv: rs.data.tuesday,
                  pv: rs.data.tuesday,
                  amt: rs.data.tuesday,
                  cnt: 0,
                },
                {
                  name: "Wedn",
                  uv: (rs.data[i].uid === "wednesday")?rs.data[i].uid:0,
                  pv: (rs.data[i].uid === "wednesday")?rs.data[i].uid:0,
                  amt: (rs.data[i].uid === "wednesday")?rs.data[i].uid:0,
                  cnt: 0,
                },
                {
                  name: "Thurs",
                  uv: rs.data.thursday,
                  pv: rs.data.thursday,
                  amt: rs.data.thursday,
                  cnt: 0,
                },
                {
                  name: "Fri",
                  uv: rs.data.friday,
                  pv: rs.data.friday,
                  amt: rs.data.friday,
                  cnt: 0,
                },
                {
                  name: "Satur",
                  uv: rs.data.saturday,
                  pv: rs.data.saturday,
                  amt: rs.data.saturday,
                  cnt: 0,
                },
              ]);
            }
  
            // console.log(rs.data)
          } catch (err) {}
        };
        fetchData();
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
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
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  