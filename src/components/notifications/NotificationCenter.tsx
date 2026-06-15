import React from "react";
import { useNotifications } from "../../contexts/NotificationContext";

export default function NotificationCenter() {
  const { notifications, markAsRead, setIsOpen } = useNotifications();

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface-container-high border border-outline-variant shadow-xl z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
        <h3 className="text-sm font-bold text-on-surface">Notificações</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white text-xs"
        >
          Fechar
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate-400 text-center">
            Nenhuma notificação
          </p>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => markAsRead(n.id)}
              className={`w-full text-left px-4 py-3 border-b border-outline-variant hover:bg-surface-container transition-colors ${!n.read ? "bg-surface-container/50" : ""}`}
            >
              <p className="text-sm font-bold text-on-surface">{n.title}</p>
              <p className="text-xs text-slate-400 mt-1">{n.message}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
