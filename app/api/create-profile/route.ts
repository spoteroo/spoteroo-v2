await supabase.from("profiles").insert({
  id: user.id,
  email: user.email,
});