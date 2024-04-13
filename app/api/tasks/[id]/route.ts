import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    const { title, description, date, completed, important } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
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
    console.log("Error Updating Task: ", error);
    return NextResponse.json({ error: "Error Updating Task", status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const task = await prisma.task.delete({
      where: { id },
    });
    console.log("Task Deleted: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Deleting Task: ", error);
    return NextResponse.json({ error: "Error Deleting Task", status: 500 });
  }
}
