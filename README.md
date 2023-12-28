# Paquete Binance Pay

This package provides functions to interact with Binance Pay, using nodejs or nextjs server-side.

The first thing you have to do is to create an account in the binance exchange you can do it from this [link :D](https://accounts.binance.info/register?ref=216281349), once you have created your account, go to [binance merchant](https://merchant.binance.com/en/)
if you want to test you can create an api key and a secret key for free, otherwise you must verify the merchant profile where you will be asked for some income data, once you finish the verification you can use it naturally and you can proceed with the use.

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

# createOrder response example

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
or
import {queryOrder} from 'binance-pay'


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

# Additional Documentation

[binance merchant](https://merchant.binance.com/en/docs/home)

# Contribute

All contributions are welcome! Please follow our contribution guidelines.

# License

This project is licensed under the MIT license.

# Paquete Binance Pay

Este paquete proporciona funciones para interactuar con Binance Pay.

...

## Enlaces

- [GitHub Repo](https://github.com/The-Lu33/binance-pay-js)
- [LinkedIn](https://www.linkedin.com/in/luisangel-tapia/)

...

## Contribuir

¡Todas las contribuciones son bienvenidas!

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
