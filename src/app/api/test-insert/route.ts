import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      { title: "Hello from Next.js", description: "Test insert", position: 1 },
    ])
    .select();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
