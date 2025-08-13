"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  async function logout() {
    const supabase = createClient();

    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      toast.error(error.message);

      return;
    }

    router.replace("/login");
  }

  if (pathname.match("/login")) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={logout}
      loading={loading}
      disabled={loading}
    >
      <LogOutIcon />
    </Button>
  );
}
