"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import AddCatchForm from "../form/AddCatchForm";
import { Separator } from "../ui/separator";

type Rights = {
  haveAccessToFishing: boolean;
  haveLogBook: boolean;
  isFishing: boolean;
};

const AddCatch = () => {
  const [asd, setAsd] = useState(false);
  const [accessRights, setAccessRights] = useState<Rights>({
    haveAccessToFishing: false,
    haveLogBook: false,
    isFishing: false,
  });
  const [isLoading, setLoading] = useState(true);

  const startFishing = () => {
    async function handler() {
      const response = await fetch("/api/fishingDateHandler", {
        method: "POST",
      });

      const data = await response.json();
      if (data.fishingDate === true) {
        console.log(data.fishingDate);
        setAccessRights((prevState) => ({
          ...prevState,
          isFishing: data.fishingDate,
        }));
      }
    }
    handler();
  };

  useEffect(() => {
    async function fetchUserRights() {
      const response = await fetch("/api/accessRightHandler");
      const data = await response.json();
      setAccessRights({
        haveAccessToFishing: data.haveAccessToFishing,
        haveLogBook: data.haveLogBook,
        isFishing: Boolean(data.isFishing),
      });
      setLoading(false);
    }

    fetchUserRights();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!accessRights.haveLogBook)
    return (
      <div className="text-md flex flex-col justify-center items-center text-center">
        <p>Nincs még fogási naplód, igényelj egyet az egyesületednél!</p>
      </div>
    );
  if (!accessRights.haveAccessToFishing)
    return (
      <div className="text-md flex flex-col justify-center items-center text-center">
        <p>Nincs enegedélyed a horgászásra</p>
      </div>
    );
  if (!accessRights.isFishing) {
    return (
      <div className="text-md flex flex-col justify-center items-center text-center">
        <p>Még nem jelölted ki a horgászás megkezdésének napját!</p>
        <p className="text-sm mt-3 text-muted-foreground">
          A gomb lenyomásávál rögzítheted a horgászat megkezdésének idejét és
          lehetőséged nyílik a fogások felvételére.
        </p>
        <Button onClick={startFishing} className="mt-5">
          {" "}
          Horgászat megkezdése
        </Button>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 w-full h-full overflow-scroll p-10">
      <div className="relative pb-10">
        <h1 className="text-xl font-medium">Fogás felvétele</h1>
        <p className="text-sm pb-2">
          Rögzítse fogásait az űrlap segítségével!
        </p>
        <Separator className="mb-5"/>
        <AddCatchForm/>
      </div>
      
      
    </div>
  );
};

export default AddCatch;
