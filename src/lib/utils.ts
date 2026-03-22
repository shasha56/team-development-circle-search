import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合して Tailwind の衝突を解消
 * `clsx` で結合し `twMerge` で最終調整
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 入力文字列を正しい URL に変換して返す
 * Google のリダイレクト（`/url?q=...`）を検出した場合は遷移先を抽出
 */
export function cleanUrl(input?: string | null): string | null {
  if (!input) return null;

  const value = input.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    // Googleリダイレクト検出
    if (host === "google.com" || host.endsWith(".google.com")) {
      if (url.pathname === "/url") {
        const redirected =
          url.searchParams.get("q") ||
          url.searchParams.get("url") ||
          url.searchParams.get("u");

        if (!redirected) return null;

        // 再帰で多重リダイレクトにも対応
        return cleanUrl(decodeURIComponent(redirected));
      }
    }

    return url.toString();
  } catch {
    return null;
  }
}
