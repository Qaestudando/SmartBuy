import type { PriceResult, ShoppingItem } from "../models/price.js";
export interface SupermarketConnector {
    readonly name: string;
    searchProduct(item: ShoppingItem): Promise<PriceResult[]>;
}
//# sourceMappingURL=SupermarketConnector.d.ts.map