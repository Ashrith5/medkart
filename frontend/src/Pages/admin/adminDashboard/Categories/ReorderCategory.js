import React, { useState } from "react";
import { Button } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ReorderCategory = () => {
  const [categories, setCategories] = useState([
    { id: "1", name: "Medicine clinic", icon: "/icons/clinic.png" },
    { id: "2", name: "Cardiologists", icon: "/icons/heart.png" },
    { id: "3", name: "Child Specialist", icon: "/icons/baby.png" },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reorder Categories</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {categories.map((cat, index) => (
                <Draggable key={cat.id} draggableId={cat.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="flex items-center gap-2 bg-gray-100 p-2 rounded shadow"
                    >
                      <img src={cat.icon} alt={cat.name} className="w-8 h-8" />
                      <span>{cat.name}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button type="primary" className="mt-4" style={{ background: "#1129CE" }}>
        Save Order
      </Button>
    </div>
  );
};

export default ReorderCategory;
