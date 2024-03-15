import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StartFirebase from "../Database/firebaseConf";
import { ref, get, child } from "firebase/database";

const db = StartFirebase();

      
const Mids = ( props ) =>
{
  const [ data, setData ] = useState( 
                                      [
                                      
                                      {
                                        name: 'Sun',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },
                                      {
                                        name: 'Mon',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },
                                      
                                      {
                                        name: 'Tue',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },

                                      {
                                        name: 'Wed',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },
                                      {
                                        name: 'Thur',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },

                                      {
                                        name: 'Fri',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      },
                                      {
                                        name: 'Sart',
                                        uv: 10,
                                        pv: 0,
                                        amt: 10,
                                      }

                                      ]
                                      )
  
   useEffect( () =>
    {   const dbref = ref(db);
        const interval = setInterval(() => {

            get( child( dbref, `Overall/001` ) ).then( ( snapshot ) =>
            { 
              const hhc = snapshot.val().home
              const pd = snapshot.val().public
              const zon = snapshot.val().zonal
              setData(
                  [{
                      name: 'Sun',
                      uv: 10,
                      pv: zon,
                      amt: 10,
                    },

                    {
                      name: 'Mon',
                      uv: 10,
                      pv: pd,
                      amt: 10,
                    },

                    {
                      name: 'Tue',
                      uv: 10,
                      pv: hhc,
                      amt: 10,
                    },
       		
       		    {
                      name: 'Wed',
                      uv: 10,
                      pv: pd,
                      amt: 10,
                    },

                    {
                      name: 'Wed',
                      uv: 10,
                      pv: pd,
                      amt: 10,
                    },

                    {
                      name: 'Thur',
                      uv: 10,
                      pv: hhc,
                      amt: 10,
                    },
                    {
                      name: 'Fri',
                      uv: 10,
                      pv: pd,
                      amt: 10,
                    },

                    {
                      name: 'Sart',
                      uv: 10,
                      pv: hhc,
                      amt: 10,
                    }
                    ]
                )
            } )
            
          }, 1000);
    return () => clearInterval(interval);
  }, []);
    
    return (
      <div style={{ width: '100%' }}>
        <p></p>

        <ResponsiveContainer width="100%" height={100}>
          <AreaChart
            width={700}
            height={100}
            data={data}
            syncId="anyId"
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
            <Area type="monotone" dataKey="pv" stroke="#afb1fa" fill="#3cfa5c" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
 
}

export default Mids;
