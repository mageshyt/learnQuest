import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl: string;
  alt: string;
  className?: string;
  fallback?: string;
  fallbackStyle?: string;
}
const UserAvatar: FC<UserAvatarProps> = ({
  imageUrl,
  alt,
  className,
  fallback,
  fallbackStyle,
}) => {
  return (
    <Avatar className={cn("w-10 h-10 select-none", className)}>
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback
        className={cn(
          "text-emerald-500 bg-emerald-200/30 font-semibold text-sm",
          fallbackStyle
        )}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
