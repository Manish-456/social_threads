import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";



export default async function Page({
  searchParams
} : {
  searchParams : {
 [key : string] : string | undefined
  }
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
 
   // Fetch users
   const result = await fetchUsers({
    userId : user.id,
    searchString : searchParams.q,
    pageNumber : searchParams.page ? +searchParams.page : 1,
    pageSize : 25,
   });


  return (
    <section>
      <h1 className="head-text mb-10">
        Search
      </h1>
      {/* Search Bar */}
      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {
            result.usersQuery.length === 0 ? (
                <p className="no-result">No users found</p>
            ) : (
                <>
                {
                    result.usersQuery.map(person => <UserCard  key={person.id} 
                      id={person.id}
                      name={person.name}
                      username={person.username}
                      imgUrl={person.image}
                      personType={"User"}
                    />)
                }
                </>
            )
        }
      </div>

      <Pagination
       path={"search"}
       pageNumber={searchParams?.page ? +searchParams.page : 1}
       isNext={result.isNext}
      />
    </section>
  )
}
