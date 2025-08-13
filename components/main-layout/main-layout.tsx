import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 py-2 md:py-6 overflow-auto no-scrollbar px-4 w-screen">
      {children}
    </main>
  );
}
