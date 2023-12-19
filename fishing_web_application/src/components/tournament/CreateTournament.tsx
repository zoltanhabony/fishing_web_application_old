import CreateTournamentForm from "../form/CreateTournamentForm";
import { Separator } from "../ui/separator";

const CreateTournament = () => {
  
    return (
      <div className="space-y-6 overflow-scroll w-full h-full p-[5px]">
        <div>
          <h1 className="text-xl font-medium">Verseny létrehozása</h1>
          <p className="text-sm text-muted-foreground">
            Hozzon létre versenyeket a horgászok számára
          </p>
        </div>
        <Separator/>
        <CreateTournamentForm/>
      </div>
    );
  }


export default CreateTournament;