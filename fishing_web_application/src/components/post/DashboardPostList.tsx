"use client";
import { useEffect, useState } from "react";
import EventCard from "../news/EventCard";

const DashboardPostList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [errorMessage, seterrorMessage] = useState<string>("");
  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/postHandler/recent");
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.posts.forEach((post: any) => {
          transformedData.push({
            postId: post.postId,
            userName: post.user.userName,
            title: post.title,
            description: post.description,
            date: post.updatedAt,
          });
        });
        setPosts(transformedData);
      } else {
        const data = await response.json();
        seterrorMessage(data.message)
        setPosts([]);
      }
    }
    getRequest();
  }, []);

  
  return (
    <>
        {errorMessage !== "" ? <p className="text-sm text-red-500">Nincs jogosultságod megtekinteni a bejegyzéseket!</p> : posts.length === 0 ? (<p className="text-sx text-gray-500">Nincs megjelenítendő adat</p>) : posts.map((post) => {
          return (
            <EventCard
              key={post.postId}
              eventType={"Post"}
              eventId={post.postId}
              title={post.title}
              date={post.date}
              description={post.description.substring(0, 200)+"..."}
              fullDescription={post.description}
              inPage={false}
              refreshData={()=>{}}
            />
          );
        })}
    </>
  );
};

export default DashboardPostList;
