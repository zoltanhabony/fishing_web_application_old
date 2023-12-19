import { Calendar } from "@/components/ui/calendar";
import { Overview } from "../statistics/charts";
import DashboardPostList from "@/components/post/DashboardPostList";
import FishCard from "@/components/fish/FishCard";
import DashboardFishList from "@/components/fish/FishList";

const Dashboard = async () => {
  return (
    <div
      className={
        "block bg-white p-4 w-full h-full " +
        " md:grid md:grid-rows-4 md:grid-cols-4 md:p-4 md:gap-4 " +
        " xl:grid-rows-5 xl:grid-cols-3 " +
        " xxl:grid-rows-5 xxl:grid-cols-4 overflow-scroll"
      }
    >
      <div
        className={
          " rounded-lg w-full " +
          " md:mt-0 md:row-span-2 md:col-span-4" +
          " xl:row-span-3 xl:col-span-2 " +
          " xxl:row-span-3 xxl:col-span-2 p-[10px]"
        }
      >
        <h2 className="text-lg">Statisztika</h2>
        <Overview />
      </div>
      <div
        className={
          " rounded-lg w-full  " +
          " md:mt-0 md:hidden" +
          " xxl:block xxl:row-span-3 xxl:col-span-1 "
        }
      >
        <h2 className="text-lg">Naptár</h2>
        <div className="grid h-full items-center justify-center">
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md h-full"
          />
        </div>
      </div>
      <div
        className={
          "flex flex-col rounded-lg overflow-scroll w-full h-auto" +
          " md:mt-0 md:row-span-2 md:col-span-2 " +
          " xl:row-span-5 xl:col-span-1 " +
          " xxl:row-span-5 xxl:col-span-1"
        }
      ><h2 className="text-lg">Legutóbbi fogások</h2><DashboardFishList/></div>
      <div
        className={
          "overflow-scroll rounded-lg  w-full h-auto" +
          " md:mt-0 md:row-span-2 md:col-span-2 " +
          " xl:row-span-2 xl:col-span-2 " +
          " xxl:row-span-2 xxl:col-span-3 p-2"
        }
      >
        <h2 className="text-lg">Legfrissebb bejegyzések</h2>
        <div className="grid xxl:grid-cols-4 xxl:grid-rows-1 gap-3 grid-flow-row lg:grid-cols-1 sxl:grid-cols-1 cp1:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1">
          <DashboardPostList/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
