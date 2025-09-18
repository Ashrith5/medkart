import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ReorderCategory = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => message.error("Failed to load categories"));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // update sortOrder locally
    const updated = items.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1,
    }));
    setCategories(updated);
  };

  const saveOrder = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/admin/categories/reorder",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories }),
        }
      );
      if (res.ok) {
        message.success("Categories reordered successfully");
      } else {
        message.error("Failed to save order");
      }
    } catch (err) {
      message.error("Error saving order");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reorder Categories</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {categories.map((cat, index) => (
                <Draggable
                  key={cat.id.toString()}
                  draggableId={cat.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="flex items-center gap-2 bg-gray-100 p-2 rounded shadow"
                    >
                      {/* Render the icon based on whether it's an image path or plain text */}
                      {cat.icon && cat.icon.startsWith('/uploads') ? (
                        <img
                          src={`http://localhost:8080${cat.icon}`} // Construct the full URL
                          alt="category icon"
                          style={{ width: "24px", height: "24px", objectFit: "contain" }}
                        />
                      ) : (
                        <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                      )}
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

      <Button
        type="primary"
        className="mt-4"
        style={{ background: "#1129CE" }}
        onClick={saveOrder}
      >
        Save Order
      </Button>
    </div>
  );
};

export default ReorderCategory;