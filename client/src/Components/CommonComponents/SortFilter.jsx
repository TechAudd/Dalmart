import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Filter } from "lucide-react";
import { useState } from "react";

export default function SortByFilter({ onSortChange }) {
  const [selected, setSelected] = useState("relevance");

  const handleChange = (value) => {
    setSelected(value);
    onSortChange?.(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer hover:shadow-md">
          <Filter className="w-4 h-4" />
          Sort By
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-56 rounded-xl border border-green-200 shadow-lg bg-neutral-50"
      >
        <RadioGroup
          value={selected}
          onValueChange={handleChange}
          className="space-y-2 !border-none"
        >
          {[
            { id: "relevance", label: "Relevance" },
            { id: "low-to-high", label: "Price: Low to High" },
            { id: "high-to-low", label: "Price: High to Low" },
          ].map((opt) => (
            <label
              key={opt.id}
              htmlFor={opt.id}
              className={`flex !border-none text-xs items-center justify-between  rounded-md border cursor-pointer transition-all
                ${
                  selected === opt.id
                    ? "bg-green-50  text-green-700 border-none"
                    : "   hover:bg-green-50/50"
                }`}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={opt.id}
                  id={opt.id}
                  className="text-green-600"
                />
                <span>{opt.label}</span>
              </div>
              {selected === opt.id && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </label>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
