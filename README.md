# 🛒 SmartBuy

> Compare o custo da sua lista de compras entre supermercados da sua cidade e descubra onde comprar mais barato.

---

## 📖 Sobre o projeto

O **SmartBuy** é uma plataforma web que permite ao usuário enviar uma lista de compras e comparar automaticamente os preços em diferentes supermercados.

O sistema consulta os catálogos online dos mercados, calcula o valor total da lista em cada estabelecimento e apresenta a melhor opção de compra.

O objetivo é economizar tempo e dinheiro, oferecendo uma comparação rápida, transparente e inteligente.

---

## ✨ Funcionalidades (MVP)

- Criar listas de compras
- Adicionar produtos e quantidades
- Informar marca específica (opcional)
- Opção **"Mais barato"** para cada item
- Comparar preços entre supermercados
- Exibir ranking dos supermercados
- Visualizar produtos indisponíveis
- Histórico de listas

---

## 🚀 Tecnologias

### Front-end

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Back-end

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic

### Banco de dados

- PostgreSQL

### Web Scraping

- Playwright

### Infraestrutura

- Docker
- GitHub Actions

---

## 📂 Estrutura do projeto

```text
pricelist/
│
├── frontend/
├── backend/
├── scraper/
├── database/
├── docs/
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🏗 Arquitetura

```text
Usuário
    │
    ▼
Frontend (Next.js)
    │
    ▼
API (FastAPI)
    │
    ├────────► PostgreSQL
    │
    └────────► Serviço de Scraping (Playwright)
```

---

## 🛣 Roadmap

### Sprint 01

- [x] Planejamento do projeto
- [ ] Criar repositório
- [ ] Configurar monorepo
- [ ] Estrutura inicial
- [ ] Docker
- [ ] CI/CD
- [ ] Documentação

### Sprint 02

- Cadastro de listas
- Cadastro de produtos
- Interface inicial

### Sprint 03

- Serviço de scraping
- Comparação de preços

### Sprint 04

- Dashboard
- Histórico de listas

### Sprint 05

- Login
- Conta do usuário

---

## 📋 Backlog (Ideias futuras)

- Aplicativo Android e iOS
- Login social (Google)
- Importação por Excel
- Importação por PDF
- Importação por foto (OCR)
- IA para identificar produtos semelhantes
- Histórico de preços
- Alertas de promoções
- Comparação por bairro
- Mapa dos supermercados
- Lista compartilhada

---

## 🤝 Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch para sua funcionalidade.
3. Faça commits descritivos.
4. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Desenvolvido por

Rafael Hans Hoeldtke
