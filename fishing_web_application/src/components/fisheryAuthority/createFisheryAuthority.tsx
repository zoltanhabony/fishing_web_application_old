import { getServerSession } from "next-auth";

import FisheryAuthorityForm from "@/components/form/FisheryAuthorityForm";
import { Separator } from "@/components/ui/separator"

const CreateFisheryAuthority = async () => {
      return (
        <div className="space-y-6 overflow-scroll w-full h-full p-10">
        <div>
          <h1 className="text-xl font-medium">Horgászegyesület létrehozása</h1>
          <p className="text-sm text-muted-foreground">
            Hozza létre horgászegyesületét, hogy fogási naplókat készíthessen
          </p>
        </div>
        <Separator/>
        <FisheryAuthorityForm />
      </div>
      )
};

export default CreateFisheryAuthority;
