import LogBookForm from "../form/LogBookForm";
import { Separator } from "../ui/separator";

const CreateLogBook = () => {
  
    return (
      <div className="space-y-6 overflow-scroll w-full h-full p-10">
        <div>
          <h1 className="text-xl font-medium">Fogási napló létrehozása</h1>
          <p className="text-sm text-muted-foreground">
            Kétszítse el a felhasználók fogásinaplóit
          </p>
        </div>
        <Separator/>
        <LogBookForm />
      </div>
    );
  }


export default CreateLogBook;