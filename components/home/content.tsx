"use client";
import React from "react";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export const Content = () => (
  <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
    <div className="flex  flex-wrap justify-between">
      <h3 className="text-center text-xl font-semibold">Latest Users</h3>
      <Link
        href="/accounts"
        as={NextLink}
        color="success"
        className="cursor-pointer"
      >
        View All
      </Link>
    </div>
  </div>
);
