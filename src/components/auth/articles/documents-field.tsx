"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Trash, Plus, FileIcon } from "lucide-react";
import { useEffect } from "react";
import { isFileSizeValid } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function DocumentsField() {
  const { control, register, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const documents = watch("documents");
  const { toast } = useToast();

  // ✅ Bloque la boucle infinie avec un effet contrôlé :
  useEffect(() => {
    if (fields.length === 0 && (!documents || documents.length === 0)) {
      append({ documentFile: new File([], ""), documentType: "" });
    }
    // ⚠️ N'ajoute PAS 'documents' dans les dépendances.
  }, [append, documents, fields.length]);

  return (
    <div className="space-y-4">
      <FormLabel>Documents</FormLabel>
      {fields.map((doc, index) => (
        <div key={doc.id} className="flex items-center gap-2">
          {typeof documents[index]?.documentFile === "string" ? (
            <div className="flex flex-1 items-center gap-2 rounded-md border p-2">
              <FileIcon className="size-4" />
              <a
                href={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/document/${documents[index].documentFile}`}
                target="_blank"
                className="truncate text-sm underline"
              >
                <span>{documents[index].documentFile.split("/").pop()}</span>
              </a>
            </div>
          ) : (
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (!isFileSizeValid(file)) {
                    toast({
                      title: "Erreur",
                      description: "Le fichier ne doit pas dépasser 1 Mo.",
                      variant: "destructive",
                    });
                    return;
                  } else setValue(`documents.${index}.documentFile`, file);
                }
              }}
            />
          )}
          <Input
            placeholder="Type du document"
            {...register(`documents.${index}.documentType`)}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            <Trash size={16} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ documentFile: new File([], ""), documentType: "" })
        }
      >
        <Plus size={16} /> Ajouter un document
      </Button>
    </div>
  );
}
