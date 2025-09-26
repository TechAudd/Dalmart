import { Search } from "lucide-react";
import SortByFilter from "@/Components/CommonComponents/SortFilter";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Switch } from "@/Components/ui/switch";


const ProductFilters = ({
  isOrganic,
  setIsOrganic,
  sortValue,
  setSortValue,
  searchClicked,
  setSearchKey,
}) => {
  return (
    <div className="w-full border border-gray-200 shadow-md p-4 sm:p-6 rounded-2xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search bar */}
      <div className="flex w-full md:w-[40%] gap-2">
        <Input
          className="border-green-600 flex-1"
          placeholder="Search here"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          className="cursor-pointer flex items-center justify-center"
          onClick={searchClicked}
        >
          <Search className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      <h2 className="text-3xl font-extrabold text-green-600 tracking-wide text-center">
        Dal Mart
      </h2>

      {/* Filter actions */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* <Button className="cursor-pointer hover:shadow-md flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button> */}

        <div className="flex items-center gap-2 px-3 py-1.5  rounded-lg shadow-sm">
          <span className="text-sm font-medium">Organic</span>
          <Switch
            value={isOrganic}
            onCheckedChange={setIsOrganic}
            className="!border"
          />
        </div>

        <SortByFilter sortValue={sortValue} setSortValue={setSortValue} />
      </div>
    </div>
  );
};

export default ProductFilters;
