import { cn } from "@/lib/utils";

export interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  description?: string;
  isUnderlined?: boolean;
  titleStyle?: string;
}
const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  description,
  isUnderlined = true,
  titleStyle,
}) => {
  return (
    <section className="space-y-2">
      <h1
        className={cn(
          "inline-block text-xl font-bold sm:block md:text-2xl",
          titleStyle,
        )}
      >
        {title}
      </h1>

      <span className="mt-2 text-lg font-medium  md:text-xl">{subtitle}</span>

      {/* description */}
      <p className="text-sm text-gray-500">{description}</p>

      {/* bottom border */}
      <div
        className={
          isUnderlined ? "bg-secondary mt-2 h-1 w-28  rounded-full" : ""
        }
      ></div>
    </section>
  );
};

export default Heading;
// "border-b-[4px] rounded-2xl border-dark w-24 mt-2";
