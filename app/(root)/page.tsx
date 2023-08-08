//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home(
  {
    searchParams 
  }:{
    searchParams: { [key: string]: string | undefined };
  }
) {
     const user = await currentUser();
     if (!user) return null;
             
     const userInfo = await fetchUser(user.id);
     if (!userInfo?.onboarded) redirect("/onboarding");
   
     const result = await fetchThreads(
       searchParams.page ? +searchParams.page : 1,
       25
     );
  return (
    <div>
     <h1 className="head-text text-left">Home</h1>
     <section className="flex flex-col gap-10">
      {
        result?.posts.length === 0 ? <p className="no-result">No threads found</p>
        : (
          <>
          {result?.posts.map(thread => (
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

     
     <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  )
}
