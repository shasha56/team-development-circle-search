"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const AlertModal = () => {
  const open: boolean = useLocalStorage();

  const STORAGE_KEY = "rumors-modal-last-seen";

  const handleClose = () => {
    window.localStorage.setItem(STORAGE_KEY, Date.now().toString()); // 現在の日時を保存
    window.dispatchEvent(new Event("storage")); // storageイベントを手動で発火させて全タブに通知
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="p-px border-b border-gray-500 border-style-dashed">
              タグに関しては生成AIを使用しているため、実際のサークルの情報とは異なる場合があります。
            </p>
            <p className="p-px">
              問い合わせに関しては、以下のリンクの公式アカウントにDMしてください。
            </p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <a href="https://x.com/RumorsYNU?s=20">rumors公式X</a>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="outline_black" onClick={handleClose}>
            確認
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
