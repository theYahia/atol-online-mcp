import { z } from "zod";
export declare const getTokenSchema: z.ZodObject<{
    login: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    login: string;
    password: string;
}, {
    login: string;
    password: string;
}>;
export declare function handleGetToken(params: z.infer<typeof getTokenSchema>): Promise<string>;
export declare const createSellReceiptSchema: z.ZodObject<{
    external_id: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        sum: z.ZodNumber;
        measurement_unit: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodDefault<z.ZodEnum<["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]>>;
        payment_object: z.ZodDefault<z.ZodEnum<["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]>>;
        vat: z.ZodObject<{
            type: z.ZodEnum<["none", "vat0", "vat10", "vat20", "vat110", "vat120"]>;
        }, "strip", z.ZodTypeAny, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }>, "many">;
    payments: z.ZodArray<z.ZodObject<{
        type: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        type: number;
    }, {
        sum: number;
        type: number;
    }>, "many">;
    client: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
    client: {
        email?: string | undefined;
        phone?: string | undefined;
    };
}, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
    client: {
        email?: string | undefined;
        phone?: string | undefined;
    };
}>;
export declare function handleCreateSellReceipt(params: z.infer<typeof createSellReceiptSchema>): Promise<string>;
export declare const createSellRefundSchema: z.ZodObject<{
    external_id: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        sum: z.ZodNumber;
        measurement_unit: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodDefault<z.ZodEnum<["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]>>;
        payment_object: z.ZodDefault<z.ZodEnum<["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]>>;
        vat: z.ZodObject<{
            type: z.ZodEnum<["none", "vat0", "vat10", "vat20", "vat110", "vat120"]>;
        }, "strip", z.ZodTypeAny, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }>, "many">;
    payments: z.ZodArray<z.ZodObject<{
        type: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        type: number;
    }, {
        sum: number;
        type: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}>;
export declare function handleCreateSellRefund(params: z.infer<typeof createSellRefundSchema>): Promise<string>;
export declare const createCorrectionSchema: z.ZodObject<{
    type: z.ZodEnum<["self", "instruction"]>;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        sum: z.ZodNumber;
        measurement_unit: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodDefault<z.ZodEnum<["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]>>;
        payment_object: z.ZodDefault<z.ZodEnum<["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]>>;
        vat: z.ZodObject<{
            type: z.ZodEnum<["none", "vat0", "vat10", "vat20", "vat110", "vat120"]>;
        }, "strip", z.ZodTypeAny, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }>, "many">;
    payments: z.ZodArray<z.ZodObject<{
        type: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        type: number;
    }, {
        sum: number;
        type: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "self" | "instruction";
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}, {
    type: "self" | "instruction";
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}>;
export declare function handleCreateCorrection(params: z.infer<typeof createCorrectionSchema>): Promise<string>;
export declare const getReportSchema: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
}, {
    uuid: string;
}>;
export declare function handleGetReport(params: z.infer<typeof getReportSchema>): Promise<string>;
export declare const createBuyReceiptSchema: z.ZodObject<{
    external_id: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        sum: z.ZodNumber;
        measurement_unit: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodDefault<z.ZodEnum<["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]>>;
        payment_object: z.ZodDefault<z.ZodEnum<["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]>>;
        vat: z.ZodObject<{
            type: z.ZodEnum<["none", "vat0", "vat10", "vat20", "vat110", "vat120"]>;
        }, "strip", z.ZodTypeAny, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }>, "many">;
    payments: z.ZodArray<z.ZodObject<{
        type: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        type: number;
    }, {
        sum: number;
        type: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}>;
export declare function handleCreateBuyReceipt(params: z.infer<typeof createBuyReceiptSchema>): Promise<string>;
export declare const createBuyRefundSchema: z.ZodObject<{
    external_id: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        sum: z.ZodNumber;
        measurement_unit: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodDefault<z.ZodEnum<["full_prepayment", "prepayment", "advance", "full_payment", "partial_payment", "credit", "credit_payment"]>>;
        payment_object: z.ZodDefault<z.ZodEnum<["commodity", "excise", "job", "service", "gambling_bet", "gambling_prize", "lottery", "lottery_prize", "intellectual_activity", "payment", "agent_commission", "composite", "another"]>>;
        vat: z.ZodObject<{
            type: z.ZodEnum<["none", "vat0", "vat10", "vat20", "vat110", "vat120"]>;
        }, "strip", z.ZodTypeAny, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }, {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }>, "many">;
    payments: z.ZodArray<z.ZodObject<{
        type: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        type: number;
    }, {
        sum: number;
        type: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        payment_method: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment";
        payment_object: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another";
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}, {
    external_id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        sum: number;
        vat: {
            type: "none" | "vat0" | "vat10" | "vat20" | "vat110" | "vat120";
        };
        measurement_unit?: string | undefined;
        payment_method?: "full_prepayment" | "prepayment" | "advance" | "full_payment" | "partial_payment" | "credit" | "credit_payment" | undefined;
        payment_object?: "commodity" | "excise" | "job" | "service" | "gambling_bet" | "gambling_prize" | "lottery" | "lottery_prize" | "intellectual_activity" | "payment" | "agent_commission" | "composite" | "another" | undefined;
    }[];
    payments: {
        sum: number;
        type: number;
    }[];
}>;
export declare function handleCreateBuyRefund(params: z.infer<typeof createBuyRefundSchema>): Promise<string>;
export declare const getTokenInfoSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare function handleGetTokenInfo(): Promise<string>;
