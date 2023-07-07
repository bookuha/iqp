import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (request.headers.get("api-key") !== process.env.API_KEY)
    return new NextResponse(
      "This route is currently secured for safety reasons.",
      { status: 403 }
    );
  try {
    const json = await request.json();

    const category = await prisma.category.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(category), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Category with this name already exists.", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
{
}
