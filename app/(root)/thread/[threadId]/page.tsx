import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById, fetchThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    threadId: string;
  };
};

export default async function Page({ params }: Props) {
  if (!params.threadId) return null;

  const thread = await fetchThreadById(params.threadId);
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id as string);

  
  if (!userInfo.onboarded) redirect("/onboarding");

  return (
<section className="relative">
<div>
     
     <ThreadCard
       key={thread._id}
       parentId={thread.parentId}
       author={thread.author}
       community={thread.community}
       createdAt={thread.createdAt}
       content={thread.text}
       comments={thread.children}
       id={thread._id}
       currentUserId={user?.id}
     />

 </div>
 <div className="mt-7">
 <Comment
          threadId={params.threadId}
          currentUserImg={user?.imageUrl as string}
          currentUserId={JSON.stringify(userInfo._id)}
        />
 </div>

 <div className="mt-10 ">
  {
    thread.children.map((childItem : any) => (
      <>
       <ThreadCard 
            key={childItem._id}
            parentId={childItem.parentId}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            content={childItem.text}
            comments={childItem.children}
            id={childItem._id}
            isComment
            currentUserId={user?.id || ""}
       />
       </>
    ))
  }
 </div>
</section>
  );
}
