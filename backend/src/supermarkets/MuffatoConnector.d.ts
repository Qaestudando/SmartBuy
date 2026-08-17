import type { PriceResult, ShoppingItem } from "../models/price.js";
import type { SupermarketConnector } from "./SupermarketConnector.js";
export declare class MuffatoConnector implements SupermarketConnector {
    readonly name = "Super Muffato";
    private readonly baseUrl;
    private readonly searchUrl;
    searchProduct(item: ShoppingItem): Promise<PriceResult[]>;
    private extractProductName;
    private filterProducts;
    private productMatchesName;
    private extractRequestedWeight;
    private extractWeight;
    private productMatchesWeight;
    private parseProducts;
    private getPrice;
    private getPreviousPrice;
    private normalizeText;
}
//# sourceMappingURL=MuffatoConnector.d.ts.map