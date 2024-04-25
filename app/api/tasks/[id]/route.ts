import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { id } = params;
    const { title, description, date, completed, important } = await req.json();

    if (!title) {
      return NextResponse.json({
        error: "Missing Title",
        status: 400,
      });
    }

    if (!description) {
      return NextResponse.json({
        error: "Missing Description",
        status: 400,
      });
    }

    if (!date) {
      return NextResponse.json({
        error: "Missing Date",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be a least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Error Updating Task", status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { id } = params;

    const task = await prisma.task.delete({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      return NextResponse.json({
        error: "Task not found or unauthorized",
        status: 404,
      });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Error Deleting Task", status: 500 });
  }
}
