import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { uptime } from "os";
import { Category, Question } from ".prisma/client";
import { array, date, number, object, string } from "yup";
import * as yup from "yup";

interface QuestionDbRequest {
  title: string;
  description: string;
  slug: string;
  categoryIDs: string[];
}

export type QuestionClientRequest = Omit<QuestionDbRequest, "slug">;

export async function GET() {
  const questions = await prisma.question.findMany();
  return NextResponse.json<Question[]>(questions);
}

const validationSchema = yup
  .object({
    title: yup
      .string()
      .min(
        4,
        "The description provided is too short." +
          " Please make sure your description is at least 16 characters long and try again. (maximum 30)"
      )
      .max(
        30,
        "The description provided is too long." +
          " Please make sure your description is no more than 30 characters long and try again."
      )
      .required("This field is required."),
    description: yup
      .string()
      .min(
        16,
        "The description provided is too short." +
          " Please make sure your description is at least 16 characters long and try again. (maximum 64)"
      )
      .max(
        64,
        "The description provided is too long." +
          " Please make sure your description is no more than 64 characters long and try again."
      )
      .required("This field is required."),
    categoryIDs: yup
      .array()
      .max(3, "You can only select up to 3 categories.")
      .required(),
  })
  .required();

// TODO: Create service
export async function POST(request: NextRequest) {
  try {
    let json: QuestionClientRequest = await request.json();

    json = await validationSchema.validate(json);

    const { title, description, slug, categoryIDs } = {
      ...json,
      slug: uptime().toString(),
    };

    const question = await prisma.question.create({
      data: {
        title,
        description,
        slug,
        categories: {
          connect: categoryIDs.map((category) => ({ id: category })),
        },
      },
    });

    return new NextResponse(JSON.stringify(question), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      return new NextResponse(error.message, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error.code === "P2002") {
      return new NextResponse("Question with this name already exists.", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
