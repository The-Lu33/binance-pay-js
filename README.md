# Paquete Binance Pay

This package provides functions to interact with Binance Pay, using nodejs or nextjs server-side.

## Instalación

```bash
npm install binance-pay
```

Uso

# createOrder

create a payment order

```
const { createOrder } = require('binance-pay');
or
import {createOrder} from 'binance-pay'

const order = await createOrder({
  name: "service",
  description: "Descripción del pedido",
  price: 1.5,
  APIKEY: "tu-api-key",
  SECRETKEY: "tu-secret-key",
  goodsCategory: "0000",
  referenceGoodsId: "01010102",
  goodsType: "01",
});
```

# creatOrdee response example

```
{
  "status": "SUCCESS",
  "code": "000000",
  "data": {
    "currency": "USDT",
    "totalFee": "1.5",
    "prepayId": "270342174837137408",
    "terminalType": "APP",
    "expireTime": 1703728285249,
    "qrcodeLink": "https://public.bnbstatic.com/static/payment/20231228/a69a78ab-ce5c-465d-9bc9-6e5109411263.jpg",
    "qrContent": "https://app.binance.com/qr/dplk1599fb0902e44cc396bd399af72f6752",
    "checkoutUrl": "https://pay.binance.com/en/checkout/e84a6776f6f843b4b9e65790f3845ef8",
    "deeplink": "bnc://app.binance.com/payment/secpay?tempToken=6TKaMw57DrMr1iM2nogN2xbBFST28hyS",
    "universalUrl": "https://app.binance.com/payment/secpay?linkToken=e84a6776f6f843b4b9e65790f3845ef8&_dp=Ym5jOi8vYXBwLmJpbmFuY2UuY29tL3BheW1lbnQvc2VjcGF5P3RlbXBUb2tlbj02VEthTXc1N0RyTXIxaU0ybm9nTjJ4YkJGU1QyOGh5Uw"
  }
}
```

# queryOrder

Consulta una orden existente.

```
const { queryOrder } = require('binance-pay');

const query = await queryOrder({
  prepayId: "270342174837137408",
  APIKEY: "tu-api-key",
  SECRETKEY: "tu-secret-key",
});

```

# queryOrder response example

```
{
  "status": "SUCCESS",
  "code": "000000",
  "data": {
    "merchantId": 216447206,
    "prepayId": "270342174837137408",
    "merchantTradeNo": "21dd27fb18486d0258cebff133c201d7",
    "status": "INITIAL",
    "currency": "USDT",
    "createTime": 1703724685342,
    "orderAmount": "1.50000000"
  }
}
```
