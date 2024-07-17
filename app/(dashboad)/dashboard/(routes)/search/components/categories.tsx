"use client";
import ListView from "@/components/global/list-view";
import { Category } from "@prisma/client";
import React, { FC } from "react";
import CategoriesItem from "./categorie-item";

import { FaDev } from "react-icons/fa";

import {
  FcMusic,
  FcSalesPerformance,
  FcSportsMode,
  FcMultipleDevices,
  FcOldTimeCamera,
  FcFilmReel,
  FcEngineering,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const IconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  Filming: FcFilmReel,
  Programming: FaDev,
  Engineering: FcEngineering,
  "Computer Science": FcMultipleDevices,
};

interface CategoriesProps {
  items: Category[];
}

const Categories: FC<CategoriesProps> = ({ items }) => {
  return (
    <ScrollArea>
      <div className="flex items-center  gap-x-2">
        <ListView
          items={items}
          render={(item) => (
            <CategoriesItem
              label={item.name}
              icon={IconMap[item.name]}
              value={item.id}
            />
          )}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Categories;
