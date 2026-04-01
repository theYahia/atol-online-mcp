import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getTokenSchema,
  createSellReceiptSchema, handleCreateSellReceipt,
  createSellRefundSchema, handleCreateSellRefund,
  createCorrectionSchema,
  getReportSchema, handleGetReport,
  createBuyReceiptSchema,
  createBuyRefundSchema,
  getTokenInfoSchema, handleGetTokenInfo,
} from "../tools/receipts.js";

vi.mock("../client.js", () => ({
  atolPost: vi.fn().mockResolvedValue({ uuid: "test-uuid-123", status: "wait", timestamp: "2026-01-01 12:00:00" }),
  atolGet: vi.fn().mockResolvedValue({ uuid: "test-uuid-123", status: "done", payload: {} }),
  getAtolToken: vi.fn().mockResolvedValue("test-token-12345678"),
}));

import { atolPost, atolGet } from "../client.js";
const mockAtolPost = vi.mocked(atolPost);
const mockAtolGet = vi.mocked(atolGet);

beforeEach(() => { mockAtolPost.mockClear(); mockAtolGet.mockClear(); });

describe("schema validation", () => {
  it("validates get_token schema", () => {
    const result = getTokenSchema.safeParse({ login: "test", password: "pass" });
    expect(result.success).toBe(true);
  });

  it("validates create_sell_receipt schema", () => {
    const result = createSellReceiptSchema.safeParse({
      external_id: "ext-1",
      items: [{ name: "Item", price: 100, quantity: 1, sum: 100, vat: { type: "vat20" } }],
      payments: [{ type: 1, sum: 100 }],
      client: { email: "test@test.com" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty items array", () => {
    const result = createSellReceiptSchema.safeParse({
      external_id: "ext-1",
      items: [],
      payments: [{ type: 1, sum: 100 }],
      client: { email: "test@test.com" },
    });
    expect(result.success).toBe(false);
  });

  it("validates correction schema", () => {
    const result = createCorrectionSchema.safeParse({
      type: "self",
      items: [{ name: "Item", price: 100, quantity: 1, sum: 100, vat: { type: "none" } }],
      payments: [{ type: 0, sum: 100 }],
    });
    expect(result.success).toBe(true);
  });

  it("validates get_report schema", () => {
    const result = getReportSchema.safeParse({ uuid: "abc-123" });
    expect(result.success).toBe(true);
  });
});

describe("create_sell_receipt", () => {
  it("calls atolPost with /sell", async () => {
    process.env.ATOL_COMPANY_INN = "1234567890";
    process.env.ATOL_PAYMENT_ADDRESS = "https://shop.example.com";
    const result = await handleCreateSellReceipt({
      external_id: "ext-1",
      items: [{ name: "Item", price: 100, quantity: 1, sum: 100, payment_method: "full_payment", payment_object: "commodity", vat: { type: "vat20" } }],
      payments: [{ type: 1, sum: 100 }],
      client: { email: "test@test.com" },
    });
    expect(mockAtolPost).toHaveBeenCalledWith("/sell", expect.objectContaining({ external_id: "ext-1" }));
    const parsed = JSON.parse(result);
    expect(parsed.uuid).toBe("test-uuid-123");
  });
});

describe("get_report", () => {
  it("calls atolGet with /report/uuid", async () => {
    const result = await handleGetReport({ uuid: "test-uuid-123" });
    expect(mockAtolGet).toHaveBeenCalledWith("/report/test-uuid-123");
    const parsed = JSON.parse(result);
    expect(parsed.status).toBe("done");
  });
});

describe("get_token_info", () => {
  it("returns token status", async () => {
    const result = await handleGetTokenInfo();
    const parsed = JSON.parse(result);
    expect(parsed.status).toBe("valid");
  });
});
