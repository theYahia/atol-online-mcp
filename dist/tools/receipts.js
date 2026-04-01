import { z } from "zod";
import { atolPost, atolGet, getAtolToken } from "../client.js";
const itemSchema = z.object({
    name: z.string().describe("Item name"),
    price: z.number().describe("Item price in rubles"),
    quantity: z.number().describe("Item quantity"),
    sum: z.number().describe("Total sum for this item"),
    measurement_unit: z.string().optional().describe("Unit of measurement"),
    payment_method: z.enum(["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]).default("full_payment").describe("Payment method"),
    payment_object: z.enum(["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]).default("commodity").describe("Payment object type"),
    vat: z.object({
        type: z.enum(["none", "vat0", "vat10", "vat20", "vat110", "vat120"]).describe("VAT type"),
    }).describe("VAT info"),
});
const paymentSchema = z.object({
    type: z.number().min(0).max(9).describe("Payment type: 0=cash, 1=electronic, 2=prepaid, 3=credit, 4=other"),
    sum: z.number().describe("Payment sum in rubles"),
});
const clientSchema = z.object({
    email: z.string().optional().describe("Client email for receipt delivery"),
    phone: z.string().optional().describe("Client phone for receipt delivery"),
});
// --- get_token ---
export const getTokenSchema = z.object({
    login: z.string().describe("ATOL Online login"),
    password: z.string().describe("ATOL Online password"),
});
export async function handleGetToken(params) {
    const response = await fetch("https://online.atol.ru/possystem/v5/getToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: params.login, pass: params.password }),
    });
    if (!response.ok)
        throw new Error(`ATOL getToken HTTP ${response.status}`);
    const data = await response.json();
    return JSON.stringify(data, null, 2);
}
// --- create_sell_receipt ---
export const createSellReceiptSchema = z.object({
    external_id: z.string().describe("Unique external receipt ID"),
    items: z.array(itemSchema).min(1).describe("Receipt items"),
    payments: z.array(paymentSchema).min(1).describe("Payments"),
    client: clientSchema.describe("Client contact for receipt delivery"),
});
export async function handleCreateSellReceipt(params) {
    const body = {
        external_id: params.external_id,
        receipt: {
            client: params.client,
            company: { inn: process.env.ATOL_COMPANY_INN, payment_address: process.env.ATOL_PAYMENT_ADDRESS },
            items: params.items,
            payments: params.payments,
            total: params.payments.reduce((sum, p) => sum + p.sum, 0),
        },
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    const result = await atolPost("/sell", body);
    return JSON.stringify(result, null, 2);
}
// --- create_sell_refund ---
export const createSellRefundSchema = z.object({
    external_id: z.string().describe("Unique external receipt ID"),
    items: z.array(itemSchema).min(1).describe("Refund items"),
    payments: z.array(paymentSchema).min(1).describe("Refund payments"),
});
export async function handleCreateSellRefund(params) {
    const body = {
        external_id: params.external_id,
        receipt: {
            client: {},
            company: { inn: process.env.ATOL_COMPANY_INN, payment_address: process.env.ATOL_PAYMENT_ADDRESS },
            items: params.items,
            payments: params.payments,
            total: params.payments.reduce((sum, p) => sum + p.sum, 0),
        },
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    const result = await atolPost("/sell_refund", body);
    return JSON.stringify(result, null, 2);
}
// --- create_correction ---
export const createCorrectionSchema = z.object({
    type: z.enum(["self", "instruction"]).describe("Correction type: self-correction or by FNS instruction"),
    items: z.array(itemSchema).min(1).describe("Correction items"),
    payments: z.array(paymentSchema).min(1).describe("Correction payments"),
});
export async function handleCreateCorrection(params) {
    const body = {
        external_id: `corr-${Date.now()}`,
        correction: {
            company: { inn: process.env.ATOL_COMPANY_INN, payment_address: process.env.ATOL_PAYMENT_ADDRESS },
            correction_info: { type: params.type },
            items: params.items,
            payments: params.payments,
        },
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    const result = await atolPost("/sell_correction", body);
    return JSON.stringify(result, null, 2);
}
// --- get_report ---
export const getReportSchema = z.object({
    uuid: z.string().describe("Receipt UUID returned by create operations"),
});
export async function handleGetReport(params) {
    const result = await atolGet(`/report/${params.uuid}`);
    return JSON.stringify(result, null, 2);
}
// --- create_buy_receipt ---
export const createBuyReceiptSchema = z.object({
    external_id: z.string().describe("Unique external receipt ID"),
    items: z.array(itemSchema).min(1).describe("Purchase items"),
    payments: z.array(paymentSchema).min(1).describe("Payments"),
});
export async function handleCreateBuyReceipt(params) {
    const body = {
        external_id: params.external_id,
        receipt: {
            client: {},
            company: { inn: process.env.ATOL_COMPANY_INN, payment_address: process.env.ATOL_PAYMENT_ADDRESS },
            items: params.items,
            payments: params.payments,
            total: params.payments.reduce((sum, p) => sum + p.sum, 0),
        },
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    const result = await atolPost("/buy", body);
    return JSON.stringify(result, null, 2);
}
// --- create_buy_refund ---
export const createBuyRefundSchema = z.object({
    external_id: z.string().describe("Unique external receipt ID"),
    items: z.array(itemSchema).min(1).describe("Refund items"),
    payments: z.array(paymentSchema).min(1).describe("Refund payments"),
});
export async function handleCreateBuyRefund(params) {
    const body = {
        external_id: params.external_id,
        receipt: {
            client: {},
            company: { inn: process.env.ATOL_COMPANY_INN, payment_address: process.env.ATOL_PAYMENT_ADDRESS },
            items: params.items,
            payments: params.payments,
            total: params.payments.reduce((sum, p) => sum + p.sum, 0),
        },
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    const result = await atolPost("/buy_refund", body);
    return JSON.stringify(result, null, 2);
}
// --- get_token_info ---
export const getTokenInfoSchema = z.object({});
export async function handleGetTokenInfo() {
    const token = await getAtolToken();
    return JSON.stringify({ token: token.substring(0, 8) + "...", status: "valid", message: "Token is cached and valid" }, null, 2);
}
//# sourceMappingURL=receipts.js.map