import { options } from "@/app/api/auth/[...nextauth]/options";
import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";

const Post = async () => {
  const session = await getServerSession(options);
  if (session) {
    if (session.user.role === "ADMIN") {
      return (
        <>
          <Tabs defaultValue="post" className="w-[100%] h-full flex flex-col">
            <TabsList>
              <TabsTrigger value="post">Bejegyzések</TabsTrigger>
              <TabsTrigger value="createPost">
                Bejegyzés létrehozása
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post" className="h-full w-full">
              <PostList />
            </TabsContent>
            <TabsContent
              value="createPost"
              className="relative h-full w-full overflow-scroll"
            >
              <div className="text-md flex flex-col p-10">
                <CreatePost />
              </div>
            </TabsContent>
          </Tabs>
          <Toaster/>
        </>
      );
    }
    if (session.user.role === "USER") {
      return (
        <PostList />
      );
    }
  }
  return <p>Hozzáférés megtagadva</p>;
};

export default Post;
