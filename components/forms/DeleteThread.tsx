"use client";
import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
type Props = {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string;
  isComment?: boolean;
};

export default function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Image
      src={`/assets/delete.svg`}
      alt="delete"
      className="cursor-pointer object-contain"
      height={18}
      width={18}
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      }}
    />
  );
}
