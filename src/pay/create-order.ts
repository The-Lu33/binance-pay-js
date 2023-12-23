import { randomBytes } from "crypto";
import CryptoJS from "crypto-js";

const url = "https://bpay.binanceapi.com/binancepay/openapi/v3/order";

export async function createOrder({
  name,
  description,
  price,
  APIKEY,
  SECRETKEY,
  goodsType,
  goodsCategory,
  referenceGoodsId,
}: {
  name: string;
  description: string;
  price: number;
  APIKEY: string;
  SECRETKEY: string;
  goodsType: string;
  goodsCategory: string;
  referenceGoodsId: string;
}) {
  try {
    const timestamp = Date.now().toString();
    const randomString = () => {
      return randomBytes(32).toString("hex").substring(0, 32);
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
    const signature = CryptoJS.HmacSHA512(payload, SECRETKEY)
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
      console.error(error.message);
    }
  }
}
