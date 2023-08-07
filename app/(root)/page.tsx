//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
   const threads = await fetchThreads(1, 30);
     const user = await currentUser();
  return (
    <div>
     <h1 className="head-text text-left">Home</h1>
     <section className="mt-9 flex flex-col gap-10">
      {
        threads?.postsQuery.length === 0 ? <p className="no-result">No threads found</p>
        : (
          <>
          {threads?.postsQuery.map(thread => (
            <ThreadCard key={thread._id}
            parentId={thread.parentId}
            author={thread.author}
            community = {thread.community}
            createdAt = {thread.createdAt}
            content={thread.text}
            comments={thread.children}
            id={thread._id} currentUserId={user?.id || ""} />
          ))}
          </>
        )
      }
     </section>
    </div>
  )
}
