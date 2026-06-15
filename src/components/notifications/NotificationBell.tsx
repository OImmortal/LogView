import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../../contexts/NotificationContext";
import NotificationCenter from "./NotificationCenter";

export default function NotificationBell() {
  const { unreadCount, isOpen, setIsOpen } = useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-400 hover:text-white focus:outline-none"
      >
        <BellIcon className="size-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {isOpen && <NotificationCenter />}
    </div>
  );
}
