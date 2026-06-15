import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApiErrorMessage,
  uploadLogFile,
} from "../../services/api/logFiles";
import { useNotifications } from "../../contexts/NotificationContext";

export default function UploadLogCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { showToast } = useNotifications();

  const uploadMutation = useMutation({
    mutationFn: uploadLogFile,
    onSuccess: (file) => {
      queryClient.invalidateQueries({ queryKey: ["logFiles"] });
      showToast(
        `Arquivo "${file.fileName}" enviado com sucesso (ID: ${file.id})`,
      );
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error, "Erro ao enviar arquivo"), "error");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
    e.target.value = "";
  };

  return (
    <section className="mb-8 bg-surface-container-low p-6 rounded-xl border border-outline-variant">
      <h2 className="text-lg font-bold text-on-surface mb-2">Upload de Logs</h2>
      <p className="text-sm text-slate-400 mb-4">
        Selecione um arquivo .log para enviar ao backend.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".log,text/plain"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadMutation.isPending}
        className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
      >
        {uploadMutation.isPending ? "Enviando..." : "Selecionar Arquivo"}
      </button>
    </section>
  );
}
