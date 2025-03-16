import { NextResponse } from "next/server";

async function generateText(prompt: string) {
  const apiUrl = "https://api-inference.huggingface.co/models/bigscience/bloom";
  const apiToken = process.env.HF_TOKEN;

  if (!apiToken) {
    throw new Error("ERREUR: Le token Hugging Face n'est pas défini !");
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erreur API Hugging Face: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return data[0]?.generated_text || "Aucune réponse générée.";
  } catch (error) {
    console.error("Erreur lors de la requête Hugging Face :", error);
    throw new Error(
      "Hugging Face API est inaccessible ou en surcharge. Réessaye plus tard."
    );
  }
}

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json(
      { error: "Le nom est requis pour générer du contenu." },
      { status: 400 }
    );
  }

  try {
    const result = await generateText(
      `Écris un article en Markdown sur "${topic}". Inclut des titres, sous-titres et listes.`
    );

    return NextResponse.json({ content: result });
  } catch (error) {
    console.error("Erreur lors de la génération :", error);
    return NextResponse.json(
      { error: "Impossible de générer la description. Réessaye plus tard." },
      { status: 500 }
    );
  }
}
