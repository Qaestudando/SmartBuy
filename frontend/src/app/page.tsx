import { ShoppingCart, Upload, FileSpreadsheet } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB]">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Smart<span className="text-[#2563EB]">Buy</span>
            </span>
          </div>

          <button className="rounded-lg px-4 py-2 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC]">
            Entrar
          </button>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 px-4 py-2 text-sm font-medium text-[#059669]">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
          Compra inteligente começa aqui
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Compre melhor.
          <br />
          <span className="text-[#2563EB]">Economize mais.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
          Envie sua lista de compras e descubra onde encontrar os melhores
          preços nos supermercados da sua cidade.
        </p>

        <div className="mt-12 w-full max-w-2xl rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white p-10 shadow-sm transition hover:border-[#2563EB] hover:shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10">
            <Upload className="h-7 w-7 text-[#2563EB]" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Envie sua lista de compras
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            Arraste seu arquivo aqui ou escolha um arquivo do seu computador.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
            <FileSpreadsheet className="h-5 w-5" />
            Escolher arquivo
          </button>

          <p className="mt-4 text-xs text-[#94A3B8]">
            Formatos aceitos: TXT e XLSX
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-[#64748B]">
          <span>ou</span>
        </div>

        <button className="mt-4 rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 font-semibold text-[#0F172A] shadow-sm transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
          + Criar lista manualmente
        </button>
      </section>

      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6">
          <p className="text-sm text-[#94A3B8]">
            © 2026 SmartBuy. Compre melhor. Economize mais.
          </p>
        </div>
      </footer>
    </main>
  );
}
