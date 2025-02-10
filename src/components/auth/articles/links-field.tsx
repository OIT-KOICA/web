"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Trash, Plus } from "lucide-react";

export default function LinksField() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <div className="space-y-4">
      <FormLabel>Liens</FormLabel>
      {fields.map((link, index) => (
        <div key={link.id} className="flex items-center space-x-2">
          <Input placeholder="Lien" {...register(`links.${index}`)} />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            <Trash size={16} />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append("")}>
        <Plus size={16} /> Ajouter un lien
      </Button>
    </div>
  );
}
