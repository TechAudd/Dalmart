import { Button } from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Check, Filter } from "lucide-react";

export default function SortByFilter({ setSortValue, sortValue }) {
  const handleChange = (value) => {
    setSortValue?.(value);
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
          value={sortValue}
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
                  sortValue === opt.id
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
              {sortValue === opt.id && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </label>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
