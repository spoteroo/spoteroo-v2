"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function approveSubmission(id: string) {
  console.log("APPROVE ID:", id);

  const { data: submission, error: fetchError } =
    await supabaseAdmin
      .from("trend_submissions")
      .select("*")
      .eq("id", id)
      .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!submission) {
    throw new Error("Submission not found");
  }

  const { data: existingTrend } = await supabaseAdmin
    .from("trends")
    .select("id")
    .eq("title", submission.title)
    .maybeSingle();

  if (existingTrend) {
    await supabaseAdmin
      .from("trend_submissions")
      .update({
        status: "rejected",
        admin_notes: "Duplicate trend",
      })
      .eq("id", id);

    revalidatePath("/dashboard/submissions");
    return;
  }

  const { error: insertError } = await supabaseAdmin
    .from("trends")
    .insert({
      title: submission.title,
      description: submission.description,
      category: submission.category,
      score: 90,
      reason: "Community submitted trend",
    });

  if (insertError) {
    throw new Error(insertError.message);
  }

  const { error: approveError } = await supabaseAdmin
    .from("trend_submissions")
    .update({
      status: "approved",
    })
    .eq("id", id);

  if (approveError) {
    throw new Error(approveError.message);
  }

  revalidatePath("/dashboard/submissions");
  revalidatePath("/trends");
}

export async function rejectSubmission(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const admin_notes =
    (formData.get("admin_notes") as string) || "";

  console.log("REJECT ID:", id);

  const { error } = await supabaseAdmin
    .from("trend_submissions")
    .update({
      status: "rejected",
      admin_notes,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/submissions");
}