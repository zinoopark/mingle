import { NextResponse } from "next/server";
import Mongo from "../../../../common/libs/mongo";

export async function GET(request: Request) {
  try {
    const mongodb = Mongo();
    const feedback = await mongodb.insertMany("Mingle", "test", [
      {
        id: "Oreo",
        chat: "Bye Bye",
      },
    ]);
    let json_response = {
      status: "success",
      data: {
        feedback,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Feedback with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
