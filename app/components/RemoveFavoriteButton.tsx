"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function RemoveFavoriteButton({
  id,
}: Props) {
  const router = useRouter();
  const supabase = createClient();

  async function removeFavorite(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Removed from favorites");

    router.refresh();
  }

  return (
    <button
      onClick={removeFavorite}
      className="
        mt-4
        bg-red-600
        hover:bg-red-700
        px-4
        py-2
        rounded-xl
        transition
      "
    >
      Remove Favorite
    </button>
  );
}