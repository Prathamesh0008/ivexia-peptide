import clientPromise from "@/lib/mongodb";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown MongoDB error";
}

function getErrorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : undefined;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("connection_tests").insertOne({
      message: "MongoDB connected successfully",
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      database: db.databaseName,
      insertedId: result.insertedId.toString(),
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        code: getErrorCode(error),
        error: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
