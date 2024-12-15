"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetCities } from "@/lib/query/configuration-query";

interface FilterSidebarProps {
  className?: string;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  localisation: string;
}

const categories = ["CASSAVA", "CORN", "CHICKEN", "TRANSPORT", "HIRE", "OTHER"];

export default function FilterSidebar({
  className,
  onFilterChange,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    localisation: "",
  });
  const [open, setOpen] = useState(false);
  const { cities } = useGetCities();

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      localisation: "",
    });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h3 className="mb-4 font-semibold">Catégories</h3>
        {categories.map((category) => (
          <div key={category} className="mb-2 flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={filters.categories.includes(category)}
              onCheckedChange={(checked) => {
                setFilters((prev) => ({
                  ...prev,
                  categories: checked
                    ? [...prev.categories, category]
                    : prev.categories.filter((c) => c !== category),
                }));
              }}
            />
            <Label htmlFor={`category-${category}`}>{category}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Zone de localisation</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {filters.localisation || "Selectionner la ville..."}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Chercher la ville..." />
              <CommandList>
                <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                <CommandGroup>
                  {cities?.map((city) => (
                    <CommandItem
                      key={city.id}
                      onSelect={() => {
                        setFilters((prev) => ({
                          ...prev,
                          localisation:
                            city.name === prev.localisation ? "" : city.name,
                        }));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.localisation === city.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {city.region + " - " + city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={resetFilters} variant="outline" className="w-full">
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
