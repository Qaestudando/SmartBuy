import type { PriceResult, ShoppingItem } from "../models/price.js";
import type { SupermarketConnector } from "./SupermarketConnector.js";
export declare class MuffatoConnector implements SupermarketConnector {
    readonly name = "Super Muffato";
    private readonly baseUrl;
    searchProduct(item: ShoppingItem): Promise<PriceResult[]>;
    private buildSearchTerm;
    private parseResponse;
}
//# sourceMappingURL=MuffatoConnector.d.ts.map