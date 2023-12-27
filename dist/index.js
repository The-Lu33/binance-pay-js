"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createOrder: () => createOrder,
  queryOrder: () => queryOrder
});
module.exports = __toCommonJS(src_exports);

// src/pay.ts
var import_crypto = require("crypto");
var import_crypto_js = __toESM(require("crypto-js"));
var url = "https://bpay.binanceapi.com/binancepay/openapi/v3/order";
async function createOrder({
  name,
  description,
  price,
  APIKEY,
  SECRETKEY,
  goodsType,
  goodsCategory,
  referenceGoodsId
}) {
  try {
    const timestamp = Date.now().toString();
    const randomString = () => {
      return (0, import_crypto.randomBytes)(32).toString("hex").substring(0, 32);
    };
    const nonce = randomString();
    const data = {
      env: {
        terminalType: "APP"
      },
      orderTags: {
        ifProfitSharing: false
      },
      merchantTradeNo: nonce,
      orderAmount: price,
      currency: "USDT",
      description: name,
      goodsDetails: [
        {
          goodsType,
          goodsCategory,
          referenceGoodsId,
          goodsName: name,
          goodsDetail: description
        }
      ]
    };
    const body = JSON.stringify(data);
    const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
    const signature = import_crypto_js.default.HmacSHA512(payload, SECRETKEY).toString().toUpperCase();
    const res = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": APIKEY,
        "BinancePay-Signature": signature
      }
    });
    const result = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error;
    }
  }
}

// src/query.ts
var import_crypto2 = require("crypto");
var import_crypto_js2 = __toESM(require("crypto-js"));
var url2 = "https://bpay.binanceapi.com/binancepay/openapi/v2/order/query";
async function queryOrder({
  prepayId,
  APIKEY,
  SECRETKEY
}) {
  try {
    const timestamp = Date.now().toString();
    const randomString = () => {
      return (0, import_crypto2.randomBytes)(32).toString("hex").substring(0, 32);
    };
    const nonce = randomString();
    const data = {
      prepayId
    };
    const body = JSON.stringify(data);
    const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
    const signature = import_crypto_js2.default.HmacSHA512(
      payload,
      "gzp7dqlitqzuaregi0pcmowaok1blqfz8weo0c9zghcvisjumsw9ww0ct3trfflq"
    ).toString().toUpperCase();
    const res = await fetch(url2, {
      method: "POST",
      body,
      headers: {
        "Content-type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": APIKEY,
        "BinancePay-Signature": signature
      }
    });
    const result = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createOrder,
  queryOrder
});
