import { useSyncExternalStore } from "react";

export const useLocalStorage = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  const STORAGE_KEY = "rumors-modal-last-seen";
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 2日間をミリ秒で定義
  const lastSeen = window.localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  return !lastSeen || now - Number(lastSeen) > TWO_DAYS_MS;
}

function getServerSnapshot(): boolean {
  return false; // サーバーサイドでは常にモーダルを表示しない
}
