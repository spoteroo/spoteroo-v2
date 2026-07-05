import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    invoices: [
      {
        id: "INV-1001",
        date: "2026-07-05",
        amount: 49,
        currency: "USD",
        status: "Paid",
      },
      {
        id: "INV-1000",
        date: "2026-06-05",
        amount: 49,
        currency: "USD",
        status: "Paid",
      },
    ],
  });
}