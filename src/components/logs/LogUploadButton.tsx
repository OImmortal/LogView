import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApiErrorMessage,
  uploadLogFile,
} from "../../services/api/logFiles";
import { useNotifications } from "../../contexts/NotificationContext";

export default function LogUploadButton() {
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
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".log,text/plain"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        title="Selecione um arquivo .log para ser carregado"
        aria-label="Selecione um arquivo .log para ser carregado"
        onClick={() => inputRef.current?.click()}
        disabled={uploadMutation.isPending}
        className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-dim transition-all disabled:opacity-50 text-sm shrink-0"
      >
        {uploadMutation.isPending ? "Enviando..." : "Selecionar Arquivo"}
      </button>
    </>
  );
}
