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
    <div className="flex items-center gap-x-2  overflow-x-scroll pb-2">
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
  );
};

export default Categories;
