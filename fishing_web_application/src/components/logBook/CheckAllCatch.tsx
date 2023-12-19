"use client";
import { useEffect, useState } from "react";
import CheckCatchTable from "../dataTables/checkCatchTable/CheckCatchTable";



const CheckAllCatch = () => {
  const [catches, setCatches] = useState<any[]>([]);


  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/logBookHandler/allCatch");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.catches.forEach((fish: any) => {
          transformedData.push({
            id: fish.catchId,
            fishName: fish.fish.fishName,
            fishImageUrl: fish.fish.fishImageUrl,
            date: new Date(fish.createdAt),
            weight: fish.weight + " " + fish.weightUnit,
            weightUnit: fish.weightUnit,
            length: fish.length + " " + fish.lengthUnit,
            lengthUint: fish.lengthUnit,
            waterAreaCode: fish.waterArea.waterAreaCode,
            waterAreaName: fish.waterArea.waterAreaName,
          });
        });
        
        setCatches(transformedData);
      }else{
        setCatches([])
      }
    }
    getRequest();
  }, []);


  return (
    <>
      <CheckCatchTable data={catches}/>
    </>
    
  );
};

export default CheckAllCatch