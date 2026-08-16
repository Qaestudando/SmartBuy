import axios from "axios";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  PriceResult,
  ShoppingItem,
} from "../models/price.js";
import type { SupermarketConnector } from "./SupermarketConnector.js";

export class MuffatoConnector implements SupermarketConnector {
  readonly name = "Super Muffato";

  private readonly baseUrl = "https://www.supermuffato.com.br";

  async searchProduct(item: ShoppingItem): Promise<PriceResult[]> {
    const searchTerm = this.buildSearchTerm(item);

    console.log(
      `[Muffato] Buscando produto: "${searchTerm}"`
    );

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: searchTerm,
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        },
        timeout: 15000,
      });

      console.log(
        `[Muffato] Resposta recebida: ${response.status}`
      );

      await this.saveDebugHtml(response.data);

      return this.parseResponse(response.data, item);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `[Muffato] Erro HTTP: ${error.response?.status ?? "sem resposta"}`
        );
      } else {
        console.error("[Muffato] Erro inesperado:", error);
      }

      return [];
    }
  }

  private buildSearchTerm(item: ShoppingItem): string {
    const parts = [item.produto];

    if (item.marca) {
      parts.push(item.marca);
    }

    if (item.quantidade) {
      parts.push(`${item.quantidade}${item.unidade}`);
    }

    return parts.join(" ");
  }

  private async saveDebugHtml(html: string): Promise<void> {
    const debugDirectory = path.resolve(process.cwd(), "debug");
    const debugFile = path.join(
      debugDirectory,
      "muffato-response.html"
    );

    await mkdir(debugDirectory, { recursive: true });
    await writeFile(debugFile, html, "utf-8");

    console.log(
      `[Muffato] HTML salvo em: ${debugFile}`
    );
  }

  private parseResponse(
    html: string,
    _item: ShoppingItem
  ): PriceResult[] {
    console.log(
      `[Muffato] HTML recebido: ${html.length} caracteres`
    );

    /*
     * O parser será implementado depois de analisarmos
     * a estrutura real da resposta do supermercado.
     */
    return [];
  }
}