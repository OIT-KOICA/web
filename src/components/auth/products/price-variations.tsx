"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Minus } from "lucide-react";

interface PriceVariationsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const parameters = [
  { value: "DISTANCE", label: "Distance" },
  { value: "URGENCY", label: "Urgence" },
  { value: "QUANTITY", label: "Quantité" },
  { value: "OTHER", label: "Autre" },
];

export default function PriceVariations({ control }: PriceVariationsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pricings",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Variation de prix</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ description: "", price: "0", parameter: "" })}
        >
          <Plus className="mr-2 size-4" /> Ajouter une Variation
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 rounded-md border p-4">
          <FormField
            control={control}
            name={`pricings.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description de la variation de prix</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Entrer la description de la variation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`pricings.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix :</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`pricings.${index}.parameterType`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paramètre de variation</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un paramètre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parameters.map((param) => (
                      <SelectItem key={param.value} value={param.value}>
                        {param.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => remove(index)}
            className="mt-2"
          >
            <Minus className="mr-2 size-4" /> Retirer la variation
          </Button>
        </div>
      ))}
    </div>
  );
}
