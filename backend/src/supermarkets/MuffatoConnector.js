import axios from "axios";
export class MuffatoConnector {
    name = "Super Muffato";
    baseUrl = "https://www.supermuffato.com.br";
    searchUrl = `${this.baseUrl}/api/catalog_system/pub/products/search`;
    async searchProduct(item) {
        const searchTerm = this.extractProductName(item);
        console.log(`[Muffato] Buscando produto pela API VTEX: "${searchTerm}"`);
        try {
            const response = await axios.get(this.searchUrl, {
                params: {
                    ft: searchTerm,
                    _from: 0,
                    _to: 49,
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0.0.0 Safari/537.36",
                    Accept: "application/json",
                },
                timeout: 15000,
            });
            console.log(`[Muffato] API respondeu: ${response.status}`);
            console.log(`[Muffato] Produtos encontrados na API: ${response.data.length}`);
            const filteredProducts = this.filterProducts(response.data, item);
            console.log(`[Muffato] Produtos após filtro: ${filteredProducts.length}`);
            return this.parseProducts(filteredProducts, item);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`[Muffato] Erro HTTP: ${error.response?.status ?? "sem resposta"}`);
                if (error.response?.data) {
                    console.error("[Muffato] Detalhes:", error.response.data);
                }
            }
            else {
                console.error("[Muffato] Erro inesperado:", error);
            }
            return [];
        }
    }
    extractProductName(item) {
        return item.produto
            .trim()
            .replace(/\b\d+(?:[.,]\d+)?\s*(?:kg|g|ml|l|un|unidade|unidades)\b/gi, "")
            .replace(/\s+/g, " ")
            .trim();
    }
    filterProducts(products, item) {
        const requestedProduct = this.normalizeText(this.extractProductName(item));
        const requestedBrand = item.marca
            ? this.normalizeText(item.marca)
            : "";
        const requestedWeight = this.extractRequestedWeight(item);
        console.log(`[Muffato] Peso solicitado: ${requestedWeight !== undefined
            ? `${requestedWeight} kg`
            : "não informado"}`);
        return products.filter((product) => {
            const productName = this.normalizeText(product.productName ?? "");
            const brand = this.normalizeText(product.brand ?? "");
            if (!productName) {
                return false;
            }
            if (requestedBrand &&
                !brand.includes(requestedBrand)) {
                return false;
            }
            if (!this.productMatchesName(productName, requestedProduct)) {
                return false;
            }
            if (requestedWeight !== undefined &&
                !this.productMatchesWeight(productName, product.items ?? [], requestedWeight)) {
                return false;
            }
            return true;
        });
    }
    productMatchesName(productName, requestedProduct) {
        const searchWords = requestedProduct
            .split(/\s+/)
            .filter((word) => word.length >= 3 &&
            !/^\d+(?:[.,]\d+)?$/.test(word));
        if (searchWords.length === 0) {
            return true;
        }
        return searchWords.every((word) => productName.includes(word));
    }
    extractRequestedWeight(item) {
        const unidade = item.unidade
            .trim()
            .toLowerCase();
        const quantidade = item.quantidade;
        if (typeof quantidade !== "number" ||
            Number.isNaN(quantidade) ||
            quantidade <= 0) {
            return undefined;
        }
        switch (unidade) {
            case "kg":
            case "quilo":
            case "quilos":
                return quantidade;
            case "g":
            case "grama":
            case "gramas":
                return quantidade / 1000;
            default:
                return undefined;
        }
    }
    extractWeight(productName) {
        const match = productName.match(/(\d+(?:[.,]\d+)?)\s*(kg|g)\b/i);
        if (!match) {
            return undefined;
        }
        const valueText = match[1];
        const unitText = match[2];
        if (valueText === undefined ||
            unitText === undefined) {
            return undefined;
        }
        const value = Number(valueText.replace(",", "."));
        const unit = unitText.toLowerCase();
        if (Number.isNaN(value)) {
            return undefined;
        }
        if (unit === "kg") {
            return value;
        }
        if (unit === "g") {
            return value / 1000;
        }
        return undefined;
    }
    productMatchesWeight(productName, items, requestedWeight) {
        const productWeight = this.extractWeight(productName);
        if (productWeight !== undefined) {
            return (Math.abs(productWeight - requestedWeight) < 0.0001);
        }
        for (const currentItem of items) {
            const itemName = this.normalizeText(currentItem.nameComplete ??
                currentItem.name ??
                "");
            const itemWeight = this.extractWeight(itemName);
            if (itemWeight !== undefined &&
                Math.abs(itemWeight - requestedWeight) < 0.0001) {
                return true;
            }
        }
        return false;
    }
    parseProducts(products, item) {
        const results = [];
        for (const product of products) {
            if (!product.items?.length) {
                continue;
            }
            const productItem = product.items.find((currentItem) => currentItem.sellers?.some((seller) => seller.commertialOffer?.IsAvailable !== false));
            if (!productItem) {
                continue;
            }
            const seller = productItem.sellers?.find((currentSeller) => currentSeller.commertialOffer?.IsAvailable !== false);
            if (!seller?.commertialOffer) {
                continue;
            }
            const offer = seller.commertialOffer;
            const preco = this.getPrice(offer);
            if (preco === undefined || preco <= 0) {
                continue;
            }
            const precoAnterior = this.getPreviousPrice(offer, preco);
            const result = {
                produto: product.productName ??
                    productItem.name ??
                    item.produto,
                quantidade: item.quantidade,
                unidade: productItem.measurementUnit ??
                    item.unidade,
                supermercado: this.name,
                modalidade: "ONLINE",
                preco,
                dataColeta: new Date().toISOString(),
                ...(product.brand
                    ? { marca: product.brand }
                    : item.marca
                        ? { marca: item.marca }
                        : {}),
                ...(precoAnterior !== undefined
                    ? { precoAnterior }
                    : {}),
                ...(offer.PriceValidUntil
                    ? {
                        validadeOferta: offer.PriceValidUntil,
                    }
                    : {}),
                ...(product.link
                    ? {
                        urlProduto: product.link,
                    }
                    : product.linkText
                        ? {
                            urlProduto: `${this.baseUrl}/${product.linkText}/p`,
                        }
                        : {}),
            };
            results.push(result);
        }
        console.log(`[Muffato] Resultados processados: ${results.length}`);
        return results;
    }
    getPrice(offer) {
        if (typeof offer.Price === "number" &&
            offer.Price > 0) {
            return offer.Price;
        }
        if (typeof offer.FullSellingPrice === "number" &&
            offer.FullSellingPrice > 0) {
            return offer.FullSellingPrice;
        }
        if (typeof offer.PriceWithoutDiscount === "number" &&
            offer.PriceWithoutDiscount > 0) {
            return offer.PriceWithoutDiscount;
        }
        return undefined;
    }
    getPreviousPrice(offer, currentPrice) {
        if (typeof offer.ListPrice === "number" &&
            offer.ListPrice > currentPrice) {
            return offer.ListPrice;
        }
        if (typeof offer.PriceWithoutDiscount === "number" &&
            offer.PriceWithoutDiscount > currentPrice) {
            return offer.PriceWithoutDiscount;
        }
        return undefined;
    }
    normalizeText(value) {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }
}
//# sourceMappingURL=MuffatoConnector.js.map