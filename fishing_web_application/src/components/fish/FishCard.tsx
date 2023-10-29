import { Croissant, Ruler, Weight } from "lucide-react";

const FishCard = () => {
  return (
    <div className=" text-gray-500 flex items-center w-full rounded-xl bg-white shadow-lg p-2 mb-4 ">
      <div className="flex justify-center items-center w-[125px]"><img src="/ponty.png" alt="" /></div>
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex p-2 justify-between items-center text-center ">
            <p className="text-md text-gray-700">Tükörponty</p>
            <p className="text-xs">2001.01.14</p>
        </div>
        <div>
            <p className="text-xs pl-2 pr-2">Nagykunsági-főcsatorna...</p>
        </div>
        <div className="flex justify-between p-2 text-gray-700">
            <div className="flex items-center p-1">
                <Weight className="w-[16px] h-[16px] hover:w-[18px] hover:h-[18px] mr-1 text-blue-700"/>
                <p className="text-xs pr-1">5725</p>
                <p className="text-xs">g</p>
            </div>
            <div className="flex items-center p-1">
                <Ruler className="w-[16px] h-[16px] hover:w-[18px] hover:h-[18px]  mr-1 text-blue-700"/>
                <p className="text-xs pr-1">70</p>
                <p className="text-xs">cm</p>
            </div>
            <div className="flex items-center p-1">
                <Croissant className="mt-1 w-[16px] h-[16px] hover:w-[18px] hover:h-[18px] mr-1 text-blue-700"/>
                <p className="text-xs">Csonti</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FishCard;
