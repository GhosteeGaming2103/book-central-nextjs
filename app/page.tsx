"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  let testZod = z
    .string()
    .max(5, { message: "Too long!!!!" })
    .min(3, { message: "Too short" });

  const handleClick = () => {
    let testString = "12";

    // Zod Try Catch
    try {
      testZod.parse(testString);
      console.log("No errors");
    } catch (e: any) {
      console.log(e.errors[0].message);
    }
    console.log("UUID", uuidv4());
  };
  return (
    <>
      <button onClick={handleClick} type="button">
        Click Me
      </button>
    </>
  );
}
