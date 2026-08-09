"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  FileSpreadsheet,
  ShoppingCart,
  Trash2,
  Upload,
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [cheapestOnly, setCheapestOnly] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const isTxt = fileName.endsWith(".txt");
    const isXlsx = fileName.endsWith(".xlsx");

    if (!isTxt && !isXlsx) {
      setSelectedFile(null);
      setError("Formato inválido. Selecione um arquivo TXT ou XLSX.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("O arquivo deve ter no máximo 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      return;
    }

    console.log("Arquivo selecionado:", selectedFile.name);
    console.log("Buscar somente menor preço:", cheapestOnly);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Header */}
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

          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC]"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Hero */}
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

        {/* Upload */}
        <div className="mt-12 w-full max-w-2xl rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white p-10 shadow-sm transition hover:border-[#2563EB] hover:shadow-md">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10">
                <Upload className="h-7 w-7 text-[#2563EB]" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Envie sua lista de compras
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                Selecione um arquivo com os produtos que deseja pesquisar.
              </p>

              <button
                type="button"
                onClick={handleChooseFile}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                <FileSpreadsheet className="h-5 w-5" />
                Escolher arquivo
              </button>

              <p className="mt-4 text-xs text-[#94A3B8]">
                Formatos aceitos: TXT e XLSX • Máximo: 5 MB
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981]/10">
                <FileSpreadsheet className="h-7 w-7 text-[#10B981]" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Arquivo selecionado
              </h2>

              <div className="mx-auto mt-5 flex max-w-md items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0F172A]">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  aria-label="Remover arquivo"
                  className="ml-4 rounded-lg p-2 text-[#EF4444] transition hover:bg-[#FEE2E2]"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleChooseFile}
                className="mt-5 text-sm font-semibold text-[#2563EB] hover:underline"
              >
                Escolher outro arquivo
              </button>
            </>
          )}

          {error && (
            <div className="mt-5 rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#DC2626]">
              {error}
            </div>
          )}
        </div>

        {/* Preferência */}
        <div className="mt-8 w-full max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white p-6 text-left shadow-sm">
          <h2 className="text-lg font-semibold">
            Como você quer encontrar seus produtos?
          </h2>

          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={cheapestOnly}
              onChange={(event) => setCheapestOnly(event.target.checked)}
              className="mt-1 h-5 w-5 cursor-pointer accent-[#2563EB]"
            />

            <span>
              <span className="block font-semibold text-[#0F172A]">
                Buscar pelo menor preço
              </span>

              <span className="mt-1 block text-sm text-[#64748B]">
                O SmartBuy vai priorizar o produto mais barato encontrado,
                independentemente da marca.
              </span>
            </span>
          </label>
        </div>

        {/* Continuar */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedFile}
          className="mt-8 rounded-xl bg-[#2563EB] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
        >
          Continuar
        </button>

        {/* Lista manual */}
        <div className="mt-8 flex items-center gap-3 text-sm text-[#64748B]">
          <span>ou</span>
        </div>

        <button
          type="button"
          className="mt-4 rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 font-semibold text-[#0F172A] shadow-sm transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
        >
          + Criar lista manualmente
        </button>
      </section>

      {/* Footer */}
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