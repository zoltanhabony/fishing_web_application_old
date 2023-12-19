"use client";
import { useEffect, useState } from "react";
import FishCard from "./FishCard";



const DashboardFishList = () => {
  const [fishes, setfishes] = useState<any[]>([]);



  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/catchHandler/recent");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.catchData.forEach((fish: any) => {
          transformedData.push({
            fishName: fish.fish.fishName,
            fishImageUrl: fish.fish.fishImageUrl,
            date: fish.createdAt,
            waterAreaName:  fish.waterArea.waterAreaName,
            weightData: fish.weight + " " + fish.weightUnit,
            lengthData: fish.length + " " + fish.lengthUnit,
            bait: fish.fishingBait,
          });
        });
        console.log(transformedData);
        setfishes(transformedData);
      } else {
        setfishes([]);
      }
    }
    getRequest();
  }, []);

  
  return (
    <>
        {fishes.length === 0 ? <p className="text-sm text-gray-500">Nincsenek rögzített fogások</p> : fishes.map((fish) => {
          return (
                <FishCard key={Math.random()} fishName={fish.fishName} fishImageUrl={fish.fishImageUrl} date={fish.date} waterAreaName={fish.waterAreaName}  weightData={fish.weightData} lengthData={fish.lengthData} bait={fish.bait}/>
          );
        })}
        

    </>
  );
};

export default DashboardFishList;
