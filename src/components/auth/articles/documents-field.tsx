"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Trash, Plus, FileIcon } from "lucide-react";
import { useEffect } from "react";
import {
  compressDocx,
  compressFile,
  compressImage,
  compressPDF,
  compressXls,
  isFileSizeValid,
} from "@/lib/utils";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetProfile } from "@/lib/query/configuration-query";

export default function DocumentsField() {
  const { control, register, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const documents = watch("documents");
  const { toast } = useToast();
  const { user } = useGetProfile();

  useEffect(() => {
    if (fields.length === 0 && (!documents || documents.length === 0)) {
      append({
        documentFile: new File([], ""),
        documentType: "",
        summary: "",
        user: user?.username ?? "Inconnu",
      });
    }
  }, [append, documents, fields.length, user?.username]);

  return (
    <div className="space-y-4">
      <FormLabel>Documents</FormLabel>
      {fields.map((doc, index) => (
        <div
          key={doc.id}
          className="flex flex-wrap items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-900"
        >
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
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json"
              className="w-full sm:w-auto"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (!isFileSizeValid(file)) {
                    toast({
                      title: "Erreur",
                      description: "Le fichier ne doit pas dépasser 10 Mo.",
                      variant: "destructive",
                    });
                    return;
                  }

                  let compressedFile = file;

                  if (file.type.includes("image")) {
                    compressedFile = await compressImage(file);
                  } else if (file.type === "application/pdf") {
                    compressedFile = await compressPDF(file);
                  } else if (
                    file.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    file.type === "application/msword"
                  ) {
                    compressedFile = await compressDocx(file);
                  } else if (
                    file.type === "application/vnd.ms-excel" ||
                    file.type ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) {
                    compressedFile = await compressXls(file);
                  } else {
                    compressedFile = await compressFile(file);
                  }

                  if (!(compressedFile instanceof File)) {
                    compressedFile = new File([compressedFile], file.name, {
                      type: file.type,
                    });
                  }

                  setValue(`documents.${index}.documentFile`, compressedFile);
                }
              }}
            />
          )}
          <Input
            placeholder="Nom du document"
            className="w-full sm:w-auto"
            {...register(`documents.${index}.documentType`)}
          />
          <Input
            placeholder="Résumé du document (optionnel)"
            className="w-full sm:w-auto"
            {...register(`documents.${index}.summary`)}
          />
          <Input
            readOnly
            className="w-full cursor-not-allowed opacity-70 sm:w-auto"
            value={user?.username ?? "Inconnu"}
          />
          <Button
            type="button"
            variant="destructive"
            className="w-full sm:w-auto"
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
          append({
            documentFile: new File([], ""),
            documentType: "",
            summary: "",
            user: user?.username ?? "Inconnu",
          })
        }
      >
        <Plus size={16} /> Ajouter un document
      </Button>
    </div>
  );
}
