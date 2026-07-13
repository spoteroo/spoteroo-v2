import DodoPayments from "dodopayments";


environment:
  process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";

const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY!;

async function dodoRequest(path: string) {
  const response = await fetch(`${DODO_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${DODO_API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Dodo API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getCustomer(customerId: string) {
  return dodoRequest(`/customers/${customerId}`);
}

export async function getSubscription(subscriptionId: string) {
  return dodoRequest(`/subscriptions/${subscriptionId}`);
}

export async function getInvoices(customerId: string) {
  return dodoRequest(`/customers/${customerId}/invoices`);
}

export const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment:
    process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
      ? "live_mode"
      : "test_mode",
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
});