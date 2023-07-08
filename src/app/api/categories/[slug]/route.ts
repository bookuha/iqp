import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Category } from ".prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (!category) {
    return new NextResponse("No category with this ID found", { status: 404 });
  }

  return NextResponse.json<Category>(category);
}
