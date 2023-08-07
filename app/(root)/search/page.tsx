import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";



export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
 
   // Fetch users
   const result = await fetchUsers({
    userId : user.id,
    searchString : '',
    pageNumber : 1,
    pageSize : 25,
    sortBy : 'descending'
   })
  return (
    <section>
      <h1 className="head-text mb-10">
        Search
      </h1>
      {/* Search Bar */}

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
    </section>
  )
}
