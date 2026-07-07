import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RemoveFavoriteButton from "@/app/components/RemoveFavoriteButton";

type Trend = {
  id: number;
  title: string;
  description: string;
  category: string;
  score: number;
};

export default async function FavoritesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("SERVER USER:", user);

if (!user?.email) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Please login first.
      </main>
    );
  }

  const { data: favoriteRows, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false });

    console.log("SERVER FAVORITES:", favoriteRows);
console.log("SERVER ERROR:", error);

  if (error) {
    console.error(error);

    return (
      <main className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load favorites.
      </main>
    );
  }

  const trendIds = (favoriteRows ?? []).map(
    (f) => f.trend_id
  );

  const { data: trends } =
    trendIds.length > 0
      ? await supabase
          .from("trends")
          .select("*")
          .in("id", trendIds)
      : { data: [] };

  const favorites =
    (favoriteRows ?? [])
      .map((favorite) => ({
        ...favorite,
        trend: trends?.find(
          (t) => t.id === favorite.trend_id
        ),
      }))
      .filter((f) => f.trend);

          return (
  <main className="min-h-screen text-white p-10">
    <div className="max-w-5xl mx-auto">

      <Link
        href="/trends"
        className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
      >
        ← Back to Trends
      </Link>

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
          {favorites.map((favorite) => (
  <Link
    key={favorite.id}
    href={`/trends/${favorite.trend.id}`}
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
        {favorite.trend.title}
      </h2>

      <p className="text-slate-400 mt-3">
        {favorite.trend.description}
      </p>

      <p className="text-xs text-slate-500 mt-2">
        Saved on{" "}
        {new Date(
          favorite.created_at
        ).toLocaleDateString()}
      </p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <span
          className="
            px-3
            py-1
            rounded-full
            bg-blue-500/15
            text-blue-300
            border
            border-blue-500/20
            text-sm
          "
        >
          {favorite.trend.category}
        </span>

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-green-500/15
            text-green-300
            border
            border-green-500/20
            text-sm
          "
        >
          Score: {favorite.trend.score}
        </span>
      </div>

      <RemoveFavoriteButton id={favorite.id} />
    </div>
  </Link>
))}
    </div>
    </div>
  </main>
);
}