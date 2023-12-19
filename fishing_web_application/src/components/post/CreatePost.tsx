
import CreatePostForm from "../form/CreatePostForm";
import { Separator } from "../ui/separator";

const CreatePost = () => {
  
    return (
      <div className="space-y-6 overflow-scroll w-full h-full p-[5px]">
        <div>
          <h1 className="text-xl font-medium">Bejegyzés létrehozása</h1>
          <p className="text-sm text-muted-foreground">
            Kétszítsen bejegyzéseket, hogy tájékoztassa felhasználóit
          </p>
        </div>
        <Separator/>
        <CreatePostForm/>
      </div>
    );
  }


export default CreatePost;