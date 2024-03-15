import "./Graph.css";
import React,{useEffect,useState} from "react";
import axios from 'axios'


import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";



const url = 'https://ruwasadbs.onrender.com'

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

export default function Graph() {
  const [list, setList] = useState(data);
  const [day,setDays] = useState({
    'mond':'',
    'tue':'',
    'wed':'',
    'thurs':'',
    'fri':'',
    'satur':'',
    'sun':''
  })

  const [ datas, setDatas ] = useState( 
    [ {
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
    ]
)

  useEffect( () =>
  {   
      const interval = setInterval(() => {

        const fetchData = async()=>{
          try{

            const rs = await axios.get(`${url}/api/weekly/data`,
                {withCredentials: true}
                )

                
                // console.log(rs.data)

                setDatas(
                  [     
                    {
                      name: "Sund",
                      uv: rs.data.sunday,
                      pv: rs.data.sunday,
                      amt: rs.data.sunday,
                      cnt: 0
                    },
                    {
                      name: "Mond",
                       uv:  rs.data.monday,
                      pv: rs.data.monday,
                      amt:  rs.data.monday,
                      cnt: 0
                    },
                    {
                      name: "Tue",
                       uv: rs.data.tuesday,
                      pv: rs.data.tuesday,
                      amt: rs.data.tuesday,
                      cnt: 0
                    },
                    {
                      name: "Wedn",
                       uv: rs.data.wednesday,
                      pv: rs.data.wednesday,
                      amt: rs.data.wednesday,
                      cnt: 0
                    },
                    {
                      name: "Thurs",
                       uv: rs.data.thursday,
                      pv: rs.data.thursday,
                      amt: rs.data.thursday,
                      cnt: 0
                    },
                    {
                      name: "Fri",
                       uv: rs.data.friday,
                      pv: rs.data.friday,
                      amt: rs.data.friday,
                      cnt: 0
                      },
                    {
                      name: "Satur",
                       uv: rs.data.saturday,
                      pv: rs.data.saturday,
                      amt: rs.data.saturday,
                      cnt: 0
                    }
                    ]
                )

                

                // console.log(rs.data)
          }catch(err){
            
          }
        }
        fetchData()

          
         
          
        }, 1000);
  return () => clearInterval(interval);
}, []);

  return (
    <ComposedChart
      width={580}
      height={250}
      data={datas}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 10
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis
        dataKey="name"
        label={{ value: "Days", position: "insideBottomRight", offset: 0 }}
        scale="band"
      />
      <YAxis label={{ value: "Litres", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="amt" fill="#a5c6fa" stroke="#a5c6fa" />
      <Bar dataKey="pv" barSize={57} fill="#2da1fe" />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </ComposedChart>
  );
}
