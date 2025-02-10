"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Trash, Plus } from "lucide-react";

export default function DocumentsField() {
  const { control, register, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  return (
    <div className="space-y-4">
      <FormLabel>Documents</FormLabel>
      {fields.map((doc, index) => (
        <div key={doc.id} className="flex items-center space-x-2">
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setValue(`documents.${index}.documentFile`, e.target.files?.[0] as File)
            }
          />
          <Input
            placeholder="Type du document"
            {...register(`documents.${index}.documentType`)}
          />
          <Button type="button" variant="destructive" onClick={() => remove(index)}>
            <Trash size={16} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ documentFile: new File([], ""), documentType: "", entityId: "", entityType: "" })
        }
      >
        <Plus size={16} /> Ajouter un document
      </Button>
    </div>
  );
}
