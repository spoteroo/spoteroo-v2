"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
};

type FavoriteTrend = {
  id: number;
  trend_id: number;
  user_email: string;
  created_at: string;
  trends: Trend | null;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<
    FavoriteTrend[]
  >([]);

  useEffect(() => {
    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) return;

      const { data, error } = await supabase
        .from("favorites")
        .select(`
          *,
          trends (*)
        `)
        .eq("user_email", user.email);

      if (error) {
        console.error(
          "Failed to load favorites:",
          error
        );
        return;
      }

      setFavorites(
        (data as FavoriteTrend[]) || []
      );
    }

    loadFavorites();
  }, []);

  return (
    <main className="min-h-screen text-white p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1
            className="
              text-6xl
              font-bold
              bg-gradient-to-r
              from-white
              to-yellow-400
              bg-clip-text
              text-transparent
            "
          >
            Favorites
          </h1>

          <p className="text-slate-400 mt-2">
            Your saved startup opportunities
          </p>

          <p className="text-slate-500 mt-1">
            {favorites.length} saved trends
          </p>
        </div>

        {favorites.length === 0 && (
          <div className="glass p-8 text-center">
            <h2 className="text-2xl font-bold">
              No Favorites Yet
            </h2>

            <p className="text-slate-400 mt-2">
              Save trends to see them here.
            </p>
          </div>
        )}

        <div className="space-y-5">
          {favorites.map((favorite) => {
            if (!favorite.trends) return null;

            return (
              <Link
                key={favorite.id}
                href={`/trends/${favorite.trends.id}`}
              >
                <div
                  className="
                    glass
                    p-6
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-yellow-500/30
                  "
                >
                  <h2 className="text-2xl font-bold">
                    {favorite.trends.title}
                  </h2>

                  <p className="text-slate-400 mt-3">
                    {favorite.trends.description}
                  </p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        bg-blue-500/15
                        text-blue-300
                        border border-blue-500/20
                        text-sm
                      "
                    >
                      {favorite.trends.category}
                    </span>

                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        bg-green-500/15
                        text-green-300
                        border border-green-500/20
                        text-sm
                      "
                    >
                      Score: {favorite.trends.score}
                    </span>
                  </div>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      const { error } =
                        await supabase
                          .from("favorites")
                          .delete()
                          .eq(
                            "id",
                            favorite.id
                          );

                      if (error) {
                        alert(error.message);
                        return;
                      }

                      setFavorites((prev) =>
                        prev.filter(
                          (f) =>
                            f.id !== favorite.id
                        )
                      );
                    }}
                    className="
                      mt-4
                      bg-red-600
                      px-4
                      py-2
                      rounded-xl
                      shadow-[0_0_15px_rgba(239,68,68,0.35)]
                    "
                  >
                    Remove Favorite
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}