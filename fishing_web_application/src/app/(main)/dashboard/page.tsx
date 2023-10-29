import FishCard from "@/components/fish/FishCard";
import EventCard from "@/components/news/EventCard";

const Dashboard = async () => {
  return (
    <div
      className={
        "block bg-[#e6eefa] p-4 w-full h-full " +
        " md:grid md:grid-rows-4 md:grid-cols-4 md:p-4 md:gap-4 " +
        " xl:grid-rows-5 xl:grid-cols-3 " +
        " xxl:grid-rows-5 xxl:grid-cols-4 overflow-scroll"
      }
    >
      <div
        className={
          " rounded-lg w-full bg-gray-100 " +
          " md:mt-0 md:row-span-2 md:col-span-4" +
          " xl:row-span-3 xl:col-span-2 " +
          " xxl:row-span-3 xxl:col-span-2"
        }
      ></div>
      <div
        className={
          " rounded-lg w-full bg-gray-100  mt-4 " +
          " md:mt-0 md:hidden" +
          " xxl:block xxl:row-span-3 xxl:col-span-1 "
        }
      ></div>
      <div
        className={
          "flex flex-col rounded-lg overflow-scroll w-full p-3" +
          " md:mt-0 md:row-span-2 md:col-span-2 " +
          " xl:row-span-5 xl:col-span-1 " +
          " xxl:row-span-5 xxl:col-span-1"
        }
      >
        <p className="text-gray-700 text-xl pb-2 pl-1">Legutóbbi fogások</p>
        <FishCard />
        <FishCard />
        <FishCard />
        <FishCard />
        <FishCard />
      </div>
      <div
        className={
          "overflow-scroll rounded-lg w-full mt-4 " +
          " md:mt-0 md:row-span-2 md:col-span-2 " +
          " xl:row-span-2 xl:col-span-2 " +
          " xxl:row-span-2 xxl:col-span-3 p-2"
        }
      >
          <p className="text-gray-700 text-xl pb-2">Események</p>
          <div className="grid xxl:grid-cols-4 xxl:grid-rows-1 gap-3 grid-flow-row lg:grid-cols-1 sxl:grid-cols-1 cp1:grid-cols-2 md:grid-cols-1 sm:grid-cols-2" >
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
          </div>
        </div>
    </div>
  );
};
export default Dashboard;
