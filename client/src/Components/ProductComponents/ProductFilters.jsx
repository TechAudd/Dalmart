import { Search, SlidersHorizontal } from "lucide-react";
import SortByFilter from "../CommonComponents/SortFilter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
const ProductFilters = () => {
  return (
    <div className="flex justify-between w-[100%]  ">
      <div className="w-[30%] flex">
        <Input className={"border-green-600"} placeHolder="Search here" />
        <Button>
          <Search className="!h-[30px] !w-[30px] " />
        </Button>
      </div>
      <div className=" flex">
        <Button className="cursor-pointer hover:shadow-md">
          Filters <SlidersHorizontal />
        </Button>
        <Button className="cursor-pointer hover:shadow-md">
          Organic <Switch className="!border" />
        </Button>
        <SortByFilter onSortChange={() => {}} />
      </div>
    </div>
  );
};

export default ProductFilters;
