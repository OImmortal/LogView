import apiClient from "./client";

export type LogFileStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "PROCESSED"
  | "ERROR";

export interface LogFile {
  id: string;
  fileName: string;
  uploadedAt: string;
  status: LogFileStatus;
  statusProcessamento?: string;
  fileSizeBytes?: number;
  criticalCount?: number;
  warningCount?: number;
  totalOccurrences?: number;
  processedAt?: string | null;
}

export interface LogEntry {
  line: number;
  severity: "CRITICAL" | "WARNING" | "INFO";
  message: string;
}

export interface LogSummary {
  critical: number;
  warning: number;
  info: number;
}

export interface LogFileDetail extends LogFile {
  summary: LogSummary;
  entries: LogEntry[];
}

export interface ProcessLogResult {
  id: string;
  status: LogFileStatus;
  summary?: LogSummary;
}

interface BackendLogFile {
  fileId?: string;
  id?: string;
  originalFileName?: string;
  fileName?: string;
  name?: string;
  status?: string;
  statusProcessamento?: string;
  fileSizeBytes?: number;
  criticalCount?: number;
  warningCount?: number;
  totalOccurrences?: number;
  createdAt?: string;
  uploadedAt?: string;
  processedAt?: string | null;
}

interface BackendLogFileDetail extends BackendLogFile {
  summary?: Partial<LogSummary> & {
    criticalCount?: number;
    warningCount?: number;
    infoCount?: number;
  };
  entries?: Array<{
    line?: number;
    lineNumber?: number;
    severity?: string;
    criticidade?: string;
    message?: string;
    mensagem?: string;
  }>;
  occurrences?: Array<{
    line?: number;
    lineNumber?: number;
    severity?: string;
    criticidade?: string;
    message?: string;
    mensagem?: string;
  }>;
}

const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

let mockFiles: LogFile[] = [
  {
    id: "mock-1",
    fileName: "app-server.log",
    uploadedAt: new Date().toISOString(),
    status: "PROCESSED",
    statusProcessamento: "PROCESSADO",
    fileSizeBytes: 2048,
    criticalCount: 5,
    warningCount: 10,
    totalOccurrences: 15,
    processedAt: new Date().toISOString(),
  },
];

const mockDetail: LogFileDetail = {
  id: "mock-1",
  fileName: "app-server.log",
  uploadedAt: new Date().toISOString(),
  status: "PROCESSED",
  summary: { critical: 5, warning: 10, info: 35 },
  entries: [
    {
      line: 42,
      severity: "CRITICAL",
      message: "Connection timeout to database",
    },
    {
      line: 87,
      severity: "CRITICAL",
      message: "NullReferenceException in handler",
    },
    {
      line: 120,
      severity: "WARNING",
      message: "Slow query detected (>2s)",
    },
    {
      line: 256,
      severity: "INFO",
      message: "Request completed successfully",
    },
  ],
};

function mapSummary(
  summary?: BackendLogFileDetail["summary"],
): LogSummary {
  return {
    critical: summary?.critical ?? summary?.criticalCount ?? 0,
    warning: summary?.warning ?? summary?.warningCount ?? 0,
    info: summary?.info ?? summary?.infoCount ?? 0,
  };
}

function mapSeverity(value?: string): LogEntry["severity"] {
  const normalized = (value ?? "INFO").toUpperCase();
  if (normalized === "CRITICAL" || normalized === "ERROR") return "CRITICAL";
  if (normalized === "WARNING" || normalized === "ALERT") return "WARNING";
  return "INFO";
}

function mapLogFile(raw: BackendLogFile, fallbackFileName?: string): LogFile {
  return {
    id: raw.fileId ?? raw.id ?? "",
    fileName:
      raw.originalFileName ??
      raw.fileName ??
      raw.name ??
      fallbackFileName ??
      "arquivo.log",
    uploadedAt: raw.createdAt ?? raw.uploadedAt ?? new Date().toISOString(),
    status: (raw.status as LogFileStatus) ?? "UPLOADED",
    statusProcessamento: raw.statusProcessamento,
    fileSizeBytes: raw.fileSizeBytes,
    criticalCount: raw.criticalCount,
    warningCount: raw.warningCount,
    totalOccurrences: raw.totalOccurrences,
    processedAt: raw.processedAt,
  };
}

function mapLogFileDetail(raw: BackendLogFileDetail, id: string): LogFileDetail {
  const entriesSource = raw.entries ?? raw.occurrences ?? [];
  const summaryFromCounts = mapSummary({
    criticalCount: raw.criticalCount,
    warningCount: raw.warningCount,
    infoCount:
      raw.totalOccurrences != null && raw.criticalCount != null && raw.warningCount != null
        ? Math.max(0, raw.totalOccurrences - raw.criticalCount - raw.warningCount)
        : undefined,
    ...raw.summary,
  });

  return {
    ...mapLogFile(raw),
    id: raw.fileId ?? raw.id ?? id,
    summary: summaryFromCounts,
    entries: entriesSource.map((entry) => ({
      line: entry.line ?? entry.lineNumber ?? 0,
      severity: mapSeverity(entry.severity ?? entry.criticidade),
      message: entry.message ?? entry.mensagem ?? "",
    })),
  };
}

export async function uploadLogFile(file: File): Promise<LogFile> {
  if (USE_MOCK) {
    const newFile: LogFile = {
      id: `mock-${Date.now()}`,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      status: "UPLOADED",
    };
    mockFiles = [newFile, ...mockFiles];
    return newFile;
  }

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<BackendLogFile>(
    "/api/log-files/upload",
    formData,
  );

  return mapLogFile(data, file.name);
}

export async function fetchLogFiles(): Promise<LogFile[]> {
  if (USE_MOCK) return mockFiles;

  const { data } = await apiClient.get<BackendLogFile[]>("/api/log-files");
  return data.map((item) => mapLogFile(item));
}

export async function fetchLogFileById(id: string): Promise<LogFileDetail> {
  if (USE_MOCK) return { ...mockDetail, id };

  const { data } = await apiClient.get<BackendLogFileDetail>(
    `/api/log-files/${id}`,
  );

  return mapLogFileDetail(data, id);
}

export async function processLogFile(id: string): Promise<ProcessLogResult> {
  if (USE_MOCK) {
    mockFiles = mockFiles.map((f) =>
      f.id === id ? { ...f, status: "PROCESSED" as const } : f,
    );

    return {
      id,
      status: "PROCESSED",
      summary: mockDetail.summary,
    };
  }

  const { data } = await apiClient.post<BackendLogFileDetail>(
    `/api/log-files/${id}/process`,
  );

  return {
    id: data.fileId ?? data.id ?? id,
    status: (data.status as LogFileStatus) ?? "PROCESSED",
    summary: mapSummary({
      criticalCount: data.criticalCount,
      warningCount: data.warningCount,
      ...data.summary,
    }),
  };
}

export async function deleteLogFile(id: string): Promise<void> {
  if (USE_MOCK) {
    mockFiles = mockFiles.filter((f) => f.id !== id);
    return;
  }

  await apiClient.delete(`/api/log-files/${id}`);
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: unknown } }).response;
    const data = response?.data;

    if (typeof data === "string" && data.trim()) return data;
    if (typeof data === "object" && data !== null) {
      const message =
        "message" in data && typeof data.message === "string"
          ? data.message
          : "error" in data && typeof data.error === "string"
            ? data.error
            : null;
      if (message) return message;
    }
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
