// src/pay.ts
import { randomBytes } from "crypto";
import CryptoJS from "crypto-js";
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
      return randomBytes(32).toString("hex").substring(0, 32);
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
    const signature = CryptoJS.HmacSHA512(payload, SECRETKEY).toString().toUpperCase();
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
import { randomBytes as randomBytes2 } from "crypto";
import CryptoJS2 from "crypto-js";
var url2 = "https://bpay.binanceapi.com/binancepay/openapi/v2/order/query";
async function queryOrder({
  prepayId,
  APIKEY,
  SECRETKEY
}) {
  try {
    const timestamp = Date.now().toString();
    const randomString = () => {
      return randomBytes2(32).toString("hex").substring(0, 32);
    };
    const nonce = randomString();
    const data = {
      prepayId
    };
    const body = JSON.stringify(data);
    const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
    const signature = CryptoJS2.HmacSHA512(
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
export {
  createOrder,
  queryOrder
};
