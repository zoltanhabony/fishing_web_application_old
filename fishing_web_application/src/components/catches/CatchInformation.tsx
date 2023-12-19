import { useEffect, useState } from "react";

interface CatchInformationProps {
  catchId: string;
}

const CatchInformation: React.FC<CatchInformationProps> = ({ catchId }) => {
  const [catchData, setCatchData] = useState<any>({});
  useEffect(() => {
    
    async function getRequest() {
      const response = await fetch("/api/catchHandler?catchId="+catchId);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const transformedData = {
            catchId: data.catchData.catchId,
            waterAreaCode: data.catchData.waterArea.waterAreaCode,
            waterAreaName: data.catchData.waterArea.waterAreaName,
            fishName: data.catchData.fish.fishName,
            createdAt: data.catchData.createdAt,
            weight: data.catchData.weight,
            weightUnit: data.catchData.weightUnit,
            length: data.catchData.length,
            lengthUnit: data.catchData.lengthUnit,
            isInjured: data.catchData.isInjured,
            method: data.catchData.method,
            fishingBait: data.catchData.fishingBait,
            temperature: data.catchData.temperature,
            temperatureUnit: data.catchData.temperatureUnit,
        }
        setCatchData(transformedData);
      } else {
        setCatchData({});
      }
    }
    getRequest();
  }, []);
  return <div className="text-sm">
    <p><b>Fogás azonosító:</b> {catchData.catchId}</p>
    <br/>
    <p><b>Vízterület Kódja:</b> {catchData.waterAreaCode}</p>
    <br/>
    <p><b>Vízterület Neve:</b> {catchData.waterAreaName}</p>
    <br/>
    <p><b>Hal típusa:</b> {catchData.fishName}</p>
    <br/>
    <p><b>Fogás időpontja:</b> {String(catchData.createdAt)}</p>
    <br/>
    <p><b>Hal súlya:</b> {catchData.weight} {catchData.weightUnit}</p>
    <br/>
    <p><b>Hal mérete:</b> {catchData.length === "0" ? "Nincs megadva" : catchData.length + " " + catchData.lengthUnit}</p>
    <br/>
    <p><b>Állapot:</b> {catchData.isInjured ? "Sérült" : "Nem sérült"}</p>
    <br/>
    <p><b>Fogás során alkalmazott módszer:</b> {catchData.method ? catchData.method : "Nincs megadva"} </p>
    <br/>
    <p><b>Fogás során alkalmazott csalianyag:</b> {catchData.fishingBait ? catchData.fishingBait : "Nincs megadva"} </p>
    <br/>
    <p><b>Időjárás (hőmérséklet):</b> {catchData.temperature === 0  ? "Nincs megadva" : catchData.temperature + " " + catchData.temperatureUnit}</p>
  </div>;
};

export default CatchInformation;
