import { Router } from "express";
import type { Request, Response } from "express";
import type { ShoppingItem } from "../models/price.js";
import { SearchService } from "../services/SearchService.js";

const router = Router();
const searchService = new SearchService();

router.post("/search", async (request: Request, response: Response) => {
  try {
    const item = request.body as ShoppingItem;

    if (!item.produto) {
      response.status(400).json({
        error: "O campo 'produto' é obrigatório.",
      });
      return;
    }

    const shoppingItem: ShoppingItem = {
      produto: item.produto,
      quantidade: item.quantidade ?? 1,
      unidade: item.unidade ?? "unidade",
    };

    if (item.marca) {
      shoppingItem.marca = item.marca;
    }

    const results = await searchService.search(shoppingItem);

    response.json({
      item: shoppingItem,
      resultados: results,
    });
  } catch (error) {
    console.error("[ProductRoutes] Erro ao pesquisar produto:", error);

    response.status(500).json({
      error: "Não foi possível pesquisar o produto.",
    });
  }
});

export default router;