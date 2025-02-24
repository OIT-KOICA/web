import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

interface PhonesProps {
  phones: string[];
  setPhones: (phones: string[]) => void;
}

export default function Phones({ phones, setPhones }: PhonesProps) {
  const [newPhone, setNewPhone] = useState("");

  // ✅ Fonction pour ajouter un numéro de téléphone
  const addPhone = () => {
    if (newPhone.trim() !== "") {
      setPhones([...phones, newPhone.trim()]);
      setNewPhone("");
    }
  };

  // ✅ Fonction pour supprimer un numéro
  const removePhone = (index: number) => {
    const updatedPhones = phones.filter((_, i) => i !== index);
    setPhones(updatedPhones);
  };

  return (
    <div>
      <label className="block text-sm font-medium">Numéros de téléphone</label>
      <div className="flex gap-2">
        <Input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Ajouter un numéro"
        />
        <Button type="button" onClick={addPhone}>
          Ajouter
        </Button>
      </div>
      <ul className="mt-2 space-y-2">
        {phones.map((phone, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded bg-gray-100 p-2"
          >
            <span>{phone}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePhone(index)}
            >
              <Trash className="size-4 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
