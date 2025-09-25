import { Search, SlidersHorizontal } from "lucide-react";
import SortByFilter from "../CommonComponents/SortFilter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const ProductFilters = () => {
  return (
    <div className="w-full border border-gray-200 shadow-md p-4 sm:p-6 rounded-2xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search bar */}
      <div className="flex w-full md:w-[40%] gap-2">
        <Input className="border-green-600 flex-1" placeholder="Search here" />
        <Button className="cursor-pointer flex items-center justify-center">
          <Search className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Filter actions */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button className="cursor-pointer hover:shadow-md flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        <div className="flex items-center gap-2 px-3 py-1.5  rounded-lg shadow-sm">
          <span className="text-sm font-medium">Organic</span>
          <Switch className="!border" />
        </div>

        <SortByFilter onSortChange={() => {}} />
      </div>
    </div>
  );
};

export default ProductFilters;
