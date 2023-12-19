import { Croissant, Ruler, Weight } from "lucide-react";

interface fishCardProps {
  fishName: string;
  fishImageUrl: string;
  date: string;
  waterAreaName: string;
  weightData: string;
  lengthData: string;
  bait: string;
}
const FishCard: React.FC<fishCardProps> = ({fishName, fishImageUrl, date, waterAreaName, weightData, lengthData, bait}) => {
  return (
    <div className=" text-gray-500 flex items-center w-full rounded-xl bg-white shadow-lg p-2 mb-4 ">
      <div className="flex justify-center items-center w-[125px]">
        <img src={fishImageUrl} alt={fishName} />
      </div>
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex p-2 justify-between items-center text-center ">
          <p className="text-md text-[#0F172A]">{fishName}</p>
          <p className="text-xs">{date}</p>
        </div>
        <div>
          <p className="text-xs pl-2 pr-2">{waterAreaName}</p>
        </div>
        <div className="flex justify-between p-2 text-gray-700">
          <div className="flex items-center p-1">
            <Weight className="w-[16px] h-[16px] hover:w-[18px] hover:h-[18px] mr-1 text-[#0F172A]" />
            <p className="text-xs pr-1">{weightData ? weightData : "-"}</p>
          </div>
          <div className="flex items-center p-1">
            <Ruler className="w-[16px] h-[16px] hover:w-[18px] hover:h-[18px]  mr-1 text-[#0F172A]" />
            <p className="text-xs pr-1">{lengthData !== "0 null" ? lengthData : "-"}</p>
          </div>
          <div className="flex items-center p-1">
            <Croissant className="mt-1 w-[16px] h-[16px] hover:w-[18px] hover:h-[18px] mr-1 text-[#0F172A]" />
            <p className="text-xs">{bait ? bait : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishCard;
