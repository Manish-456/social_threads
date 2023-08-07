import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers, getActivities } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
import Image from "next/image";



export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
 
   // get notifications
   const activities = await getActivities(userInfo._id);



  return (
    <section>
      <h1 className="head-text mb-10">
        <section className="mt-10 flex flex-col gap-5">
          {
            activities.length > 0 ? (
              <>
              {
                activities.map(activity => (
                   <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                    <article className="activity-card">
                      <Image src={activity.author.image} alt={"profile picture"} height={48} width={48} className="rounded-full object-cover" />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activity.author.name}
                        </span>
                        replied to your thread
                      </p>
                    </article>
                   </Link>
                ))
              }
              </>
            ) : (
              <p className="!text-base-regular text-light-3">
                No activity
              </p>
            )
          }
        </section>
      </h1>
    </section>
  )
}
