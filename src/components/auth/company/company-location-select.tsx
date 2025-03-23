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
import { useGetCities } from "@/lib/query/configuration-query";

interface LocationSelectProps {
  onValueChange: (value: string) => void;
  value: string;
}

export default function CompanyLocationSelect({
  onValueChange,
  value,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const { cities } = useGetCities();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? cities?.find((location) => location.name === value)?.name
            : "Choisir une ville..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Chercher une ville..." />
          <CommandList>
            <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
            <CommandGroup>
              {cities &&
                cities.map((location) => (
                  <CommandItem
                    key={location.id}
                    onSelect={() => {
                      onValueChange(
                        location.name === value ? "" : location.name
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === location.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location.region + " - " + location.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
