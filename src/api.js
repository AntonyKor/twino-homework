export async function getQuestions() {
  const resp = await fetch("/suitability");
  const data = await resp.json();

  return data.groups;
}
