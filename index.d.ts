declare module "binance-pay" {
  export function createOrder(order: {
    name: string;
    description: string;
    price: number;
    APIKEY: string;
    SECRETKEY: string;
    goodsType: string;
    goodsCategory: string;
    referenceGoodsId: string;
  }): any;
  // Declara aquí las demás funciones y tipos
}
