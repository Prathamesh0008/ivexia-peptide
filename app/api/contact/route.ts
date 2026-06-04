import clientPromise from "@/lib/mongodb";

type ContactPayload = {
  email: string;
  message: string;
  name: string;
  phone?: string;
  subject: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown MongoDB error";
}

function getErrorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : undefined;
}

function clean(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload: ContactPayload = {
      email: clean(formData.get("email")),
      message: clean(formData.get("message")),
      name: clean(formData.get("name")),
      phone: clean(formData.get("phone")),
      subject: clean(formData.get("subject")),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return Response.json(
        { message: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return Response.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const now = new Date();

    const result = await db.collection("contact_messages").insertOne({
      ...payload,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    return Response.json({
      id: result.insertedId.toString(),
      message: "Your message was sent successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to save contact message", error);

    return Response.json(
      {
        code: getErrorCode(error),
        detail: getErrorMessage(error),
        message: "Unable to send message. Check MongoDB connection.",
        success: false,
      },
      { status: 500 },
    );
  }
}
