"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const crypto_1 = require("crypto");
const crypto_js_1 = __importDefault(require("crypto-js"));
const url = "https://bpay.binanceapi.com/binancepay/openapi/v3/order";
function createOrder({ name, description, price, APIKEY, SECRETKEY, goodsType, goodsCategory, referenceGoodsId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const timestamp = Date.now().toString();
            const randomString = () => {
                return (0, crypto_1.randomBytes)(32).toString("hex").substring(0, 32);
            };
            const nonce = randomString();
            const dataExample = {
                env: {
                    terminalType: "APP",
                },
                orderTags: {
                    ifProfitSharing: false,
                },
                merchantTradeNo: nonce,
                orderAmount: price,
                currency: "USDT",
                description: name,
                goodsDetails: [
                    {
                        goodsType: goodsType,
                        goodsCategory: goodsCategory,
                        referenceGoodsId: referenceGoodsId,
                        goodsName: name,
                        goodsDetail: description,
                    },
                ],
            };
            const body = JSON.stringify(dataExample);
            const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
            const signature = crypto_js_1.default.HmacSHA512(payload, SECRETKEY)
                .toString()
                .toUpperCase();
            const res = yield fetch(url, {
                method: "POST",
                body: body,
                headers: {
                    "Content-type": "application/json",
                    "BinancePay-Timestamp": timestamp,
                    "BinancePay-Nonce": nonce,
                    "BinancePay-Certificate-SN": APIKEY,
                    "BinancePay-Signature": signature,
                },
            });
            const result = yield res.json();
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    });
}
exports.createOrder = createOrder;
