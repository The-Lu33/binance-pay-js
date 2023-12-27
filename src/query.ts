import { randomBytes } from "crypto";
import CryptoJS from "crypto-js";
import { QUERY_ORDERS_PROPS } from "./types";

const url = "https://bpay.binanceapi.com/binancepay/openapi/v2/order/query";
export async function queryOrder({
  prepayId,
  APIKEY,
  SECRETKEY,
}: QUERY_ORDERS_PROPS) {
  try {
    const timestamp = Date.now().toString();
    const randomString = () => {
      return randomBytes(32).toString("hex").substring(0, 32);
    };
    const nonce = randomString();

    const data = {
      prepayId: prepayId,
    };
    const body = JSON.stringify(data);
    const payload = timestamp + "\n" + nonce + "\n" + body + "\n";
    const signature = CryptoJS.HmacSHA512(
      payload,
      "gzp7dqlitqzuaregi0pcmowaok1blqfz8weo0c9zghcvisjumsw9ww0ct3trfflq"
    )
      .toString()
      .toUpperCase();
    const res = await fetch(url, {
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
    const result = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}
