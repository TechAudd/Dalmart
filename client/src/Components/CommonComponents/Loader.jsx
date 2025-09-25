import { Loader2 } from "lucide-react";

export const CustomLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};
