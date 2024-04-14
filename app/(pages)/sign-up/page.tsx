"use client";
import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function page() {
  redirect(`/`);
  // <div className="flex items-center justify-center h-full">
  //   ghjk
  //   <SignUp afterSignUpUrl={"/"} />
  // </div>;
}
