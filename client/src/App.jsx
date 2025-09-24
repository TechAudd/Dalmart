import { Loader } from "lucide-react";
import { useFetchTestQuery } from "./Services/testSlice";

export const App = () => {
  const { data, isLoading, isError, refetch } = useFetchTestQuery();
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen flex justify-center items-center flex-col">
          {Object.keys(data)?.map((item) => (
            <p>
              {[item]} : {data[item]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
