import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // get user id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 500 });
    }

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

    // let dateEntered = new Date(date);
    // let currentDate = new Date();

    // if (dateEntered < currentDate) {
    //   return NextResponse.json({
    //     error: "Date must be the same or ahead of current date",
    //     status: 400,
    //   });
    // }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be a least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    console.log("TASK CREATED: ", task);

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unathorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    // console.log("TASKS: ", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASK: ", error);
    return NextResponse.json({ error: "Error getting task", status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unathorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
