// scripts/seed.ts

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { Client as PgClient } from "pg";
import { cleanUrl } from "../src/lib/utils";
import { CIRCLES } from "../src/data/circles";
import type { Database } from "../src/types/database";

type CircleInsert = Database["public"]["Tables"]["circles"]["Insert"];

async function main() {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const rows: CircleInsert[] = CIRCLES.map((c: any) => ({
    id: c.id,
    name: c.name,
    is_official: c.isOfficial ?? null,
    icon_url: c.iconUrl ?? null,
    tags: c.tags ?? [],
    twitter_url: cleanUrl(c.twitterUrl ?? c.twitter_url),
    instagram_url: cleanUrl(c.instagramUrl ?? c.instagram_url),
  }));

  // upsert
  const { error } = await supabase
    .from("circles")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    throw error;
  }

  // シーケンス同期
  const pg = new PgClient({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  await pg.connect();

  await pg.query(`
    SELECT setval(
      pg_get_serial_sequence('public.circles', 'id'),
      (SELECT COALESCE(MAX(id), 0) FROM public.circles)
    );
  `);

  await pg.end();

  console.log("✅ seed 完了");
}

main().catch(console.error);
