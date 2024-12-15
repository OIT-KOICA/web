"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useGetUnits } from "@/lib/query/configuration-query";

interface UnitOfMeasureSelectProps {
  onValueChange: (value: string) => void;
  value: string;
}

export default function UnitOfMeasureSelect({
  onValueChange,
  value,
}: UnitOfMeasureSelectProps) {
  const [open, setOpen] = useState(false);
  const [customUnit, setCustomUnit] = useState("");

  const { units } = useGetUnits();

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === "other") {
      setCustomUnit("other");
    } else {
      onValueChange(selectedValue);
    }
    setOpen(false);
  };

  const handleCustomUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? units?.find((unit) => unit.name === value)?.name || value
              : "Choisir une unité de mésure..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Chercher une unité de mésure..." />
            <CommandList>
              <CommandEmpty>Aucune unité de mésure trouvée.</CommandEmpty>
              <CommandGroup>
                {units &&
                  units.map((unit) => (
                    <CommandItem
                      key={unit.name}
                      onSelect={() => handleSelect(unit.name)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === unit.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {unit.name}
                    </CommandItem>
                  ))}
                <CommandItem onSelect={() => handleSelect("other")}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "other" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  Autre
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {customUnit === "other" && (
        <Input
          type="text"
          placeholder="Entrer votre unité de mésure"
          onChange={handleCustomUnitChange}
        />
      )}
    </div>
  );
}
