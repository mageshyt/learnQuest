"use client";

import { Chapter } from "@prisma/client";
import React, { FC, useEffect } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import ClientWrapper from "@/components/global/client-wrapper";
import ListView from "@/components/global/list-view";
import { cn } from "@/lib";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ActionTooltip from "@/components/global/action-tooltip";

interface ChaptersListProps {
  onEdit: (chapterId: string) => void;
  onReadOrder: (updateDate: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList: FC<ChaptersListProps> = ({
  onEdit,
  onReadOrder,
  items,
}) => {
  // ---------------------------------------state---------------------------------------
  const [chapters, setChapters] = React.useState<Chapter[]>(items);
  // ---------------------------------------hooks---------------------------------------
  useEffect(() => {
    setChapters(items);
  }, [items]);
  // ---------------------------------------handlers---------------------------------------

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // create a new array of items
    const items = Array.from(chapters);
    // remove the item from the source index
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIdx = Math.min(result.source.index, result.destination.index);
    const endIdx = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIdx, endIdx + 1);

    setChapters(items);

    const updateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReadOrder(updateData);
  };
  return (
    <ClientWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ListView
                items={chapters}
                render={(chapter, index) => (
                  <Draggable
                    key={chapter.id}
                    draggableId={chapter.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={cn(
                          "flex items-center gap-x-2 bg-slate-200 border-slate-200 text-slate-700 rounded-md mb-4 text-sm",
                          chapter.isPublished &&
                            "bg-emerald-200 border-emerald-200"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {/* Icons */}
                        <div
                          className={cn(
                            "px-2 py-3 border-r-slate-200 border-r hover:bg-slate-300 rounded-l-md",
                            chapter.isPublished &&
                              "border-r-emerald-300 hover:bg-emerald-200"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5" />
                        </div>

                        {/* title */}

                        {chapter.title}

                        {/* badge */}
                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                          {chapter.isFree && <Badge>Free</Badge>}
                          <Badge
                            className={cn(
                              "bg-slate-500 text-white",
                              chapter.isPublished && "bg-emerald-500 "
                            )}
                          >
                            {chapter.isPublished ? "Published" : "Draft"}
                          </Badge>

                          <Pencil
                            onClick={() => onEdit(chapter.id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                          ></Pencil>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ClientWrapper>
  );
};

export default ChaptersList;
