"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface CommentProps {
  threadId: string;
  currentUserId: string | undefined;
  currentUserImg: string;
}

export default function Comment({
  threadId,
  currentUserId,
  currentUserImg,
}: CommentProps) {

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    try {
      await addCommentToThread({
        commentText: values.thread,
        userId: JSON.parse(currentUserId as string),
        threadId : JSON.parse(threadId),
        path: pathname,
      });
      form.reset();
    //   router.push("/");
    } catch (error: any) {
      console.log(`Failed to create thread ${error.message}`);
    }
  }

  return (
    <>
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="profile-image"
                  height={48}
                  width={48}
                  className="rounded-full object-contain"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  className="no-focus text-light-1 outline-none"
                  placeholder="Comment..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
    </>
  );
}
