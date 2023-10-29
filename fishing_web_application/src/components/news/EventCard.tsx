import { Trophy } from "lucide-react";

const EventCard = () => {
  return (
    <div className="relative bg-white rounded-xl text-gray-500 shadow-lg p-2">
      <div className="relative h-[150px] w-full bg-[url('/to.jpg')] bg-no-repeat bg-center bg-cover rounded-t-xl hover:opacity-80"></div>
      <div className="relative pl-2">
        <div className="relative flex justify-center items-center w-[32px] h-[32px]  bg-blue-500 mt-[-20px] z-10 rounded-sm">
          <Trophy className="text-white" />
        </div>
        <div className=" flex flex-col justify-center  w-full">
          <p className=" text-gray-700 pt-1">News title</p>
          <p className="text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit...
          </p>
          <p className="inline text-xs text-blue-500 float-right pt-1">tovább a cikkre</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
