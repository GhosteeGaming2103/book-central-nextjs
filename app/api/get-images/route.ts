import { NextResponse } from "next/server";
import prisma from "@/app/prisma";


export async function GET(request: Request) {
    const images = await prisma.image.findMany();
    console.log(images);
    return NextResponse.json(images);
}