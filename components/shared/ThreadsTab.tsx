import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Props) {
  // TODO : Fetch profile threads
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserThreads(accountId);
  }
  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result?.threads?.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          parentId={thread.parentId}
          author={
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          content={thread.text}
          comments={thread.children}
          id={thread._id}
          currentUserId={currentUserId}
        />
      ))}
    </section>
  );
}
