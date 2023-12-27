/**
 * Tipos de bienes disponibles.
 *
 * @typedef {Object} GOODTYPES
 * @property {"01"} "01" - Tangible Goods.
 * @property {"02"} "02" - Virtual Goods.
 */
/**
 * Categorías de bienes.
 *
 * @typedef {Object} GOODCATEGORIES
 * @property {"0000"} "0000" - Electronics & Computers.
 * @property {"1000"} "1000" - Books, Music & Movies.
 * @property {"2000"} "2000" - Home, Garden & Tools.
 * @property {"3000"} "3000" - Clothes, Shoes & Bags.
 * @property {"4000"} "4000" - Toys, Kids & Baby.
 * @property {"5000"} "5000" - Automotive & Accessories.
 * @property {"6000"} "6000" - Game & Recharge.
 * @property {"7000"} "7000" - Entertainment & Collection.
 * @property {"8000"} "8000" - Jewelry.
 * @property {"9000"} "9000" - Domestic service.
 * @property {"A000"} "A000" - Beauty care.
 * @property {"B000"} "B000" - Pharmacy.
 * @property {"C000"} "C000" - Sports & Outdoors.
 * @property {"D000"} "D000" - Food, Grocery & Health products.
 * @property {"E000"} "E000" - Pet supplies.
 * @property {"F000"} "F000" - Industry & Science.
 * @property {"Z000"} "Z000" - Others.
 */
type GOODTYPES = {
    "01": "Tangible Goods";
    "02": "Virtual Goods";
};
type GOODCATEGORIES = {
    "0000": "Electronics & Computers";
    "1000": "Books, Music & Movies";
    "2000": "Home, Garden & Tools";
    "3000": "Clothes, Shoes & Bags";
    "4000": "Toys, Kids & Baby";
    "5000": "Automotive & Accessories";
    "6000": "Game & Recharge";
    "7000": "Entertainment & Collection";
    "8000": "Jewelry";
    "9000": "Domestic service";
    A000: "Beauty care";
    B000: "Pharmacy";
    C000: "Sports & Outdoors";
    D000: "Food, Grocery & Health products";
    E000: "Pet supplies";
    F000: "Industry & Science";
    Z000: "Others";
};
interface PAY_PROPS {
    name: string;
    description: string;
    price: number;
    APIKEY: string;
    SECRETKEY: string;
    goodsType: keyof GOODTYPES;
    goodsCategory: keyof GOODCATEGORIES;
    referenceGoodsId: string;
}
/**
 * Propiedades para realizar una consulta de órdenes.
 * @interface QUERY_ORDERS_PROPS
 */
interface QUERY_ORDERS_PROPS {
    /**
     * Identificador de pago previo necesario para realizar la consulta.
     * Puede obtenerse al realizar el proceso de pago y obtener el prepayId.
     * @type {string}
     * @example "1234567890"
     */
    prepayId: string;
    /**
     * Clave API requerida para autenticar la consulta.
     * Debe obtenerse a través del proveedor de servicios y ser mantenida de manera segura.
     * @type {string}
     * @example "tu-api-key"
     */
    APIKEY: string;
    /**
     * Clave secreta necesaria para autenticar la consulta.
     * Debe obtenerse a través del proveedor de servicios y ser mantenida de manera segura.
     * @type {string}
     * @example "tu-secret-key"
     */
    SECRETKEY: string;
}

declare function createOrder({ name, description, price, APIKEY, SECRETKEY, goodsType, goodsCategory, referenceGoodsId, }: PAY_PROPS): Promise<any>;

declare function queryOrder({ prepayId, APIKEY, SECRETKEY, }: QUERY_ORDERS_PROPS): Promise<any>;

export { type GOODCATEGORIES, type GOODTYPES, type PAY_PROPS, type QUERY_ORDERS_PROPS, createOrder, queryOrder };
