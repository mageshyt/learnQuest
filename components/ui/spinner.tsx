import { FC } from "react";
import { ClipLoader, GridLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
  type?: "spinner" | "grid";
  size?: "sm" | "md" | "lg";
}

const Spinner: FC<SpinnerProps> = ({
  loading,
  type = "spinner",
  size = "md",
}) => {
  return loading ? (
    <div className="flex justify-center items-center">
      {type === "spinner" ? (
        <ClipLoader
          color="#000000"
          size={size === "sm" ? 20 : size === "md" ? 30 : 50}
        />
      ) : (
        <GridLoader
          color="#000000"
          size={size === "sm" ? 20 : size === "md" ? 30 : 50}
        />
      )}
    </div>
  ) : null;
};

export default Spinner;
