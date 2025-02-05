import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDropdownProps {
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  placeholder,
}: FilterDropdownProps) {
  return (
    <Select
      value={value || ""}
      onValueChange={(newValue) => onChange(newValue || null)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
