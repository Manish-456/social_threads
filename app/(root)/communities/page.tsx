import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";



export default async function Page({
  searchParams
} : {
  searchParams : {
    [key : string] : string  | undefined
  }
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
 
   // Fetch Communities
   const result = await fetchCommunities({
    searchString : searchParams.q,
    pageNumber : searchParams.page ? +searchParams.page : 1,
    pageSize : 25,
   })

  return (
    <section>
      <h1 className="head-text mb-10">
        Search
      </h1>
      {/* Search Bar */}
     <Searchbar
     routeType="communities"
     />
      <div className="mt-14 flex flex-col gap-9">
        {
            result.communitiesQuery.length === 0 ? (
                <p className="no-result">No community found</p>
            ) : (
                <>
                {
                    result.communitiesQuery.map(person => <CommunityCard  key={person.id} 
                      id={person.id}
                      name={person.name}
                      username={person.username}
                      imgUrl={person.image}
                      bio={person.bio}
                      members={person.members}
                    />)
                }
                </>
            )
        }
      </div>
      <Pagination 
      pageNumber={searchParams.page ? +searchParams.page : 1}
       isNext={result.isNext}
       path="communities"
      />
    </section>
  )
}
