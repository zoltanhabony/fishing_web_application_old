import ServiceCard from "@/components/services/ServiceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, BarChartBig, BookMarked, BookOpen, MapPin, Trophy } from "lucide-react";
import Link from "next/link";

export default function FirstPage() {
  return (
    <div className="block ">
      <div className="relative w-full h-[70px] flex  justify-between items-center p-3">
        <div className=" relative flex items-center justify-between">
          <img src="/32.png" alt="" className="" />
          <p className="text-lg pl-3">Fishify</p>
        </div>
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "block right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Bejelentkezés
        </Link>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "block right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Regisztráció
        </Link>
      </div>
      <div className="relative w-full  flex justify-center items-center ">
        <div className="hidden md:flex w-[50%] h-full  justify-center items-center">
          <img
            src="/login.jpg"
            alt=""
            className="md:w-[100%] lg:w-[100%] xl:w-[85%] h-auto"
          />
        </div>
        <div className="w-full md:w-[50%] h-full  flex items-center justify-center p-5">
          <div className="w-[full] text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Szervezze át az egyesülete működését az online térbe
            </h1>
            <p className="mb-6 text-md font-normal text-gray-500 lg:text-md sm:px-16 xl:px-48 dark:text-gray-400">
              Hozza létre egyesületét az alkalmazás segítségével.
              Készítsen felhasználóinak online fogási naplót.
              Ellenőrizze a vízterületeken folyó tevékenységeket.
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div
          id="services"
          className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
        >
          <div className="container xl:max-w-6xl mx-auto px-4">
          <header className="text-center mx-auto mb-12 lg:px-20">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-black">Felhasználóknak</h2>
           
            <p className="text-gray-500 leading-relaxed font-light text-md mx-auto pb-2">Rövidítsd le az egyesület működésének folyamatait az alkalmazás segítségével</p>
        </header>
        <div className="flex flex-wrap flex-row -mx-4 text-center items-center justify-center">
            <ServiceCard serviceName={"Fogási napló"} serviceDesc={"A felhasználók online kezelhetik a fogási naplójukat"} icon={<BookMarked />}/>
            <ServiceCard serviceName={"Bejegyzések"} serviceDesc={"A felhasználók a legfrissebb információkról értesülhetnek"} icon={<BookOpen />}/>
            <ServiceCard serviceName={"Versenyek"} serviceDesc={"A felhasználók már online is tudnak versenyekre jelentkezni"} icon={<Trophy />}/>
            <ServiceCard serviceName={"Térkép"} serviceDesc={"A felhasználók a térkép segítségével tájékozódhatnak a tó területén"} icon={<MapPin />}/>
            <ServiceCard serviceName={"Statsiztika"} serviceDesc={"A felhasználók a statisztika segítségével megtekinthetik a teljesítményüket"} icon={<BarChartBig />}/>
        </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div
          id="services"
          className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
        >
          <div className="container xl:max-w-6xl mx-auto px-4">
          <header className="text-center mx-auto mb-12 lg:px-20">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-blue-600 ">Üzemeltetőknek</h2>
           
            <p className="text-gray-500 leading-relaxed font-light text-md mx-auto pb-2">Rövidítsd le az egyesület működésének folyamatait az alkalmazás segítségével</p>
        </header>
        <div className="flex flex-wrap flex-row -mx-4 text-center items-center justify-center">
            <ServiceCard serviceName={"Fogási napló"} serviceDesc={"Az üzemeltetők naplókat hozhatnak létre a felhasználók számára és ellenőrizhetik azokat"} icon={<BookMarked className="text-blue-600"/>}/>
            <ServiceCard serviceName={"Bejegyzések"} serviceDesc={"Az üzemeltetők bejegyzéseket hozhatnak létre"} icon={<BookOpen className="text-blue-600"/>}/>
            <ServiceCard serviceName={"Versenyek"} serviceDesc={"Az üzemeltetők versenyeket hirdethetnek meg"} icon={<Trophy className="text-blue-600"/>}/>
            <ServiceCard serviceName={"Térkép"} serviceDesc={"Az üzemeltetők térképet hozhatnak létre a vízterületeinek megjelenítéséhez"} icon={<MapPin className="text-blue-600"/>}/>
            <ServiceCard serviceName={"Statsiztika"} serviceDesc={"Az üzemeltetők a statisztika segítségével elmezhetik a kifogott halakat"} icon={<BarChartBig className="text-blue-600"/>}/>
            <ServiceCard serviceName={"Egyesület"} serviceDesc={"Az egyesületét és tagjait mostantól az online térben kezelheti"} icon={<Home  className="text-blue-600"/>}/>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
