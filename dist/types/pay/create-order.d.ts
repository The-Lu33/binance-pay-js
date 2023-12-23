export declare function createOrder({ name, description, price, APIKEY, SECRETKEY, goodsType, goodsCategory, referenceGoodsId, }: {
    name: string;
    description: string;
    price: number;
    APIKEY: string;
    SECRETKEY: string;
    goodsType: string;
    goodsCategory: string;
    referenceGoodsId: string;
}): Promise<any>;
