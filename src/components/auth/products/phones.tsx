import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, useFieldArray } from "react-hook-form";

interface PhonesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export default function Phones({ control }: PhonesProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  return (
    <div>
      <FormLabel className="mr-4">Numéros de téléphone</FormLabel>
      {fields.map((field, index) => (
        <FormField
          control={control}
          key={field.id}
          name={`phones.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-2 flex items-center space-x-2">
                  <Input
                    {...field}
                    placeholder="Entrer le numéro de téléphone"
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append("")}
      >
        Ajouter un numéro de téléphone
      </Button>
    </div>
  );
}
