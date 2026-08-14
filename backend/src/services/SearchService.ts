import type {
  PriceResult,
  ShoppingItem,
} from "../models/price.js";
import { MuffatoConnector } from "../supermarkets/MuffatoConnector.js";

export class SearchService {
  private readonly supermarkets = [
    new MuffatoConnector(),
  ];

  async search(item: ShoppingItem): Promise<PriceResult[]> {
    const results: PriceResult[] = [];

    for (const supermarket of this.supermarkets) {
      const supermarketResults =
        await supermarket.searchProduct(item);

      results.push(...supermarketResults);
    }

    return results;
  }
}