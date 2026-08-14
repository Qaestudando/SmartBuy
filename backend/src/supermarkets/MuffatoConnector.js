import axios from "axios";
export class MuffatoConnector {
    name = "Super Muffato";
    baseUrl = "https://www.supermuffato.com.br";
    async searchProduct(item) {
        const searchTerm = this.buildSearchTerm(item);
        console.log(`[Muffato] Buscando produto: "${searchTerm}"`);
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: searchTerm,
                },
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0.0.0 Safari/537.36",
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                },
                timeout: 15000,
            });
            console.log(`[Muffato] Resposta recebida: ${response.status}`);
            return this.parseResponse(response.data, item);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`[Muffato] Erro HTTP: ${error.response?.status ?? "sem resposta"}`);
            }
            else {
                console.error("[Muffato] Erro inesperado:", error);
            }
            return [];
        }
    }
    buildSearchTerm(item) {
        const parts = [item.produto];
        if (item.marca) {
            parts.push(item.marca);
        }
        if (item.quantidade) {
            parts.push(`${item.quantidade}${item.unidade}`);
        }
        return parts.join(" ");
    }
    parseResponse(html, item) {
        console.log(`[Muffato] HTML recebido: ${html.length} caracteres`);
        /*
         * Nesta primeira etapa ainda não vamos interpretar
         * o HTML do supermercado.
         *
         * O objetivo é validar a comunicação com o catálogo.
         */
        return [];
    }
}
//# sourceMappingURL=MuffatoConnector.js.map