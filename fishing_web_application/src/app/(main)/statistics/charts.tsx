"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview() {
  const [fishes, setFishes] = useState<any[]>([]);
  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/statisticsHandler");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFishes(data.data);
      } else {
        setFishes([]);
      }
    }
    getRequest();
  }, []);



  return (
      <div className="w-auto h-[350px] overflow-scroll rounded-xl">
        
          <ResponsiveContainer width={2000} height={350}>
            
            <BarChart data={fishes}>
            <CartesianGrid strokeDasharray="8" stroke="#DFE2E6" />
              <XAxis
                dataKey={"fishName"}
                stroke="#0F172A"
                fontSize={10}
                tickLine={true}
                axisLine={true}
                tick={<Tick />}
                interval={0}
              />
              <YAxis
                stroke="#0F172A"
                fontSize={10}
                tickLine={true}
                axisLine={true}
              />
              <Bar dataKey="count" fill="#0F172A" radius={[10, 10, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
      </div>
  );
}

export const Tick: FC<any> = ({
    payload: { value },
    verticalAnchor,
    visibleTicksCount,
    ...rest
  }) => (
    <text {...rest} className="bar-chart-tick" dy={12}>
      {value}
    </text>
  );