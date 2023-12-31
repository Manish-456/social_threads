import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteThread from "@/components/forms/DeleteThread";

type Props = {
  parentId: string | null;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  content: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  id: string;
  currentUserId?: string;
};

export default function ThreadCard({
  parentId,
  author,
  community,
  createdAt,
  content,
  comments,
  id,
  currentUserId,
  isComment,
}: Props) {

  return (
    <article
      className={`flex w-full flex-col rounded-xl   ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile-image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-4 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src={"/assets/heart-gray.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Link href={`/thread/${id}`}>
                  {" "}
                  <Image
                    src={"/assets/reply.svg"}
                    alt="reply"
                    width={24}
                    height={24}
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <Image
                  src={"/assets/repost.svg"}
                  alt="repost"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Image
                  src={"/assets/share.svg"}
                  alt="share"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      <DeleteThread
      threadId={JSON.stringify(id)}
      currentUserId={currentUserId!}
      authorId={author.id}
      parentId={parentId as string}
      isComment={isComment}


      />
        {/* TODO: Show comment logos */}
      </div>
      {
        !isComment && comments.length > 0 && (
          <div className="ml-1 mt-3 flex items-center gap-2">
            {
              comments.slice(0, 2).map((comment, index) => (
                <Image
                 key={`~comment-${index}`}
                src={comment.author.image} alt={`user_${index}`}
                width={24}
                height={24}
                className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}                />
              ))
            }
               <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
          </div>
        )
      }
        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)} - {community.name} Community
            </p>
           <div className="h-6 w-6 shrink-0 relative">
           <Image
              src={community.image}
              alt={community.name}
             fill
              className="ml-1 rounded-full object-cover"
            />
           </div>
          </Link>
        )}
    </article>
  );
}
