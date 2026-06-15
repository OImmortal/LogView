import apiClient from "./client";

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

let mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Arquivo processado com sucesso",
    message: "5 erros críticos encontrados. 10 alertas encontrados.",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

export async function fetchNotifications(): Promise<Notification[]> {
  if (USE_MOCK) return mockNotifications;
  const { data } = await apiClient.get<Notification[]>("/api/notifications");
  return data;
}

export function addMockNotification(notification: Omit<Notification, "id">) {
  mockNotifications = [
    { ...notification, id: `n-${Date.now()}` },
    ...mockNotifications,
  ];
}

export function markNotificationRead(id: string) {
  mockNotifications = mockNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
}

export interface NotificationTransport {
  subscribe(onMessage: (notification: Notification) => void): () => void;
}

export class PollingNotificationTransport implements NotificationTransport {
  subscribe(onMessage: (notification: Notification) => void): () => void {
    void onMessage;
    return () => {};
  }
}

export class SSENotificationTransport implements NotificationTransport {
  subscribe(onMessage: (notification: Notification) => void): () => void {
    void onMessage;
    return () => {};
  }
}

export class WebSocketNotificationTransport implements NotificationTransport {
  subscribe(onMessage: (notification: Notification) => void): () => void {
    void onMessage;
    return () => {};
  }
}
