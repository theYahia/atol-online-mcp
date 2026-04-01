#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  getTokenSchema, handleGetToken,
  createSellReceiptSchema, handleCreateSellReceipt,
  createSellRefundSchema, handleCreateSellRefund,
  createCorrectionSchema, handleCreateCorrection,
  getReportSchema, handleGetReport,
  createBuyReceiptSchema, handleCreateBuyReceipt,
  createBuyRefundSchema, handleCreateBuyRefund,
  getTokenInfoSchema, handleGetTokenInfo,
} from "./tools/receipts.js";

const server = new McpServer({ name: "atol-online-mcp", version: "1.0.0" });

server.tool("get_token", "Get ATOL Online authentication token.", getTokenSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetToken(params) }] }));

server.tool("create_sell_receipt", "Create a sell receipt (fiscal check) for 54-FZ compliance.", createSellReceiptSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateSellReceipt(params) }] }));

server.tool("create_sell_refund", "Create a sell refund receipt.", createSellRefundSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateSellRefund(params) }] }));

server.tool("create_correction", "Create a correction receipt (self or by FNS instruction).", createCorrectionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateCorrection(params) }] }));

server.tool("get_report", "Get receipt processing status/report by UUID.", getReportSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetReport(params) }] }));

server.tool("create_buy_receipt", "Create a buy receipt (purchase from individual).", createBuyReceiptSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateBuyReceipt(params) }] }));

server.tool("create_buy_refund", "Create a buy refund receipt.", createBuyRefundSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateBuyRefund(params) }] }));

server.tool("get_token_info", "Check current token status and expiry.", getTokenInfoSchema.shape,
  async () => ({ content: [{ type: "text", text: await handleGetTokenInfo() }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[atol-online-mcp] Server started. 8 tools registered.");
}

main().catch((error) => { console.error("[atol-online-mcp] Error:", error); process.exit(1); });
