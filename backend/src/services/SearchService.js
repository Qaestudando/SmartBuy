import { MuffatoConnector } from "../supermarkets/MuffatoConnector.js";
export class SearchService {
    supermarkets = [
        new MuffatoConnector(),
    ];
    async search(item) {
        const results = [];
        for (const supermarket of this.supermarkets) {
            const supermarketResults = await supermarket.searchProduct(item);
            results.push(...supermarketResults);
        }
        return results;
    }
}
//# sourceMappingURL=SearchService.js.map