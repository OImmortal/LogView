import React, { createContext, useCallback, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markNotificationRead,
  Notification,
} from "../services/api/notifications";

interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  markAsRead: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 15000,
  });

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const showToast = useCallback(
    (message: string, type: ToastMessage["type"] = "success") => {
      const id = `toast-${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      markNotificationRead(id);
      queryClient.setQueryData<Notification[]>(["notifications"], (old: Notification[] | undefined) =>
        (old ?? []).map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    },
    [queryClient],
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showToast,
        toasts,
        dismissToast,
        markAsRead,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return ctx;
}
