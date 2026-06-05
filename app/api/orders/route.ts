//app\api\orders\route.ts
import clientPromise from "@/lib/mongodb";

type CheckoutItem = {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
};

type CheckoutPayload = {
  customer: {
    address: string;
    city: string;
    company: string;
    country: string;
    email: string;
    name: string;
    phone: string;
    state: string;
    zip: string;
  };
  items: CheckoutItem[];
  payment: {
    cardLast4: string;
    status: string;
  };
  totals: {
    shipping: number;
    subtotal: number;
    tax: number;
    total: number;
  };
};

function isPositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown MongoDB error";
}

function getErrorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : undefined;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CheckoutPayload;

    if (!payload.customer?.email || !payload.customer?.name) {
      return Response.json(
        { message: "Customer name and email are required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return Response.json(
        { message: "Order must contain at least one item." },
        { status: 400 },
      );
    }

    if (
      !isPositiveNumber(payload.totals?.subtotal) ||
      !isPositiveNumber(payload.totals?.shipping) ||
      !isPositiveNumber(payload.totals?.tax) ||
      !isPositiveNumber(payload.totals?.total)
    ) {
      return Response.json({ message: "Invalid order totals." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const orderNumber = `IVX-${Date.now().toString().slice(-8)}`;
    const now = new Date();

    const result = await db.collection("orders").insertOne({
      orderNumber,
      customer: payload.customer,
      items: payload.items,
      payment: {
        cardLast4: payload.payment?.cardLast4 || "0000",
        provider: "demo",
        status: payload.payment?.status || "pending",
      },
      status: "placed",
      totals: payload.totals,
      createdAt: now,
      updatedAt: now,
    });

    return Response.json({
      id: result.insertedId.toString(),
      orderNumber,
      createdAt: now.toISOString(),
      status: "placed",
      total: payload.totals.total,
    });
  } catch (error) {
    console.error("Failed to create order", error);

    return Response.json(
      {
        code: getErrorCode(error),
        detail: getErrorMessage(error),
        message: "Unable to save order. Check MongoDB connection.",
      },
      { status: 500 },
    );
  }
}
