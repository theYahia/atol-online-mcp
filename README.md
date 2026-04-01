# @theyahia/atol-online-mcp

MCP server for **ATOL Online** fiscal receipt API -- 54-FZ compliant receipt generation, refunds, corrections, and status checks for Russian online cash registers.

## Tools

| Tool | Description |
|------|-------------|
| `get_token` | Get authentication token |
| `create_sell_receipt` | Create a sell receipt (fiscal check) |
| `create_sell_refund` | Create a sell refund receipt |
| `create_correction` | Create a correction receipt |
| `get_report` | Get receipt status/report by UUID |
| `create_buy_receipt` | Create a buy receipt |
| `create_buy_refund` | Create a buy refund receipt |
| `get_token_info` | Check current token status |

## Install

### Claude Desktop / Cline / Cursor

```json
{
  "mcpServers": {
    "atol-online": {
      "command": "npx",
      "args": ["-y", "@theyahia/atol-online-mcp"],
      "env": {
        "ATOL_LOGIN": "<YOUR_LOGIN>",
        "ATOL_PASSWORD": "<YOUR_PASSWORD>",
        "ATOL_GROUP_CODE": "<YOUR_GROUP_CODE>",
        "ATOL_COMPANY_INN": "<YOUR_INN>",
        "ATOL_PAYMENT_ADDRESS": "<YOUR_PAYMENT_URL>"
      }
    }
  }
}
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ATOL_LOGIN` | Yes | ATOL Online login |
| `ATOL_PASSWORD` | Yes | ATOL Online password |
| `ATOL_GROUP_CODE` | Yes | KKT group code |
| `ATOL_COMPANY_INN` | No | Company INN for receipts |
| `ATOL_PAYMENT_ADDRESS` | No | Payment address / URL |

## Demo Prompts

- "Create a sell receipt for 1x Coffee at 350 rub paid electronically"
- "Refund the last receipt for item 'Subscription' at 990 rub"
- "Check receipt status for UUID abc-123-def"
- "Create a correction receipt for a missed cash sale of 500 rub"
- "Generate a buy receipt for purchasing supplies at 15000 rub"
- "What's the current token status?"

## API Reference

Base URL: `https://online.atol.ru/possystem/v5/`

Docs: [https://online.atol.ru/possystem/v5/](https://online.atol.ru/possystem/v5/)

## License

MIT
