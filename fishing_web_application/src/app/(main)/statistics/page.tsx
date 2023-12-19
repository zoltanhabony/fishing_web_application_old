import { options } from "@/app/api/auth/[...nextauth]/options";
import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";
import { Overview } from "./charts";

const Post = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
     return (<div className="grid h-full overflow-scroll "><h1 className="pl-5 pb-5 text-xl">Statisztika</h1><Overview/><h1 className="pl-5 pb-5 text-xl">Statisztika</h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>)
    }
    if (session.user.role === "USER") {
      return (
        <p>user stat</p>
      );
    }
  }
  return <p>Hozzáférés megtagadva</p>;
};

export default Post;
