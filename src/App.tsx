import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function MemoryPalaceApp() {
  const [palace, setPalace] = useState([]);
  const [roomName, setRoomName] = useState("");

  const addRoom = () => {
    if (!roomName.trim()) return;
    setPalace([...palace, { name: roomName, points: [] }]);
    setRoomName("");
  };

  const updateRoomName = (index, name) => {
    const updated = [...palace];
    updated[index].name = name;
    setPalace(updated);
  };

  const deleteRoom = (index) => {
    const updated = palace.filter((_, i) => i !== index);
    setPalace(updated);
  };

  const addPoint = (roomIndex, point) => {
    const updated = [...palace];
    updated[roomIndex].points.push(point);
    setPalace(updated);
  };

  const updatePoint = (roomIndex, pointIndex, newPoint) => {
    const updated = [...palace];
    updated[roomIndex].points[pointIndex] = newPoint;
    setPalace(updated);
  };

  const deletePoint = (roomIndex, pointIndex) => {
    const updated = [...palace];
    updated[roomIndex].points.splice(pointIndex, 1);
    setPalace(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Memory Palace</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button onClick={addRoom}>Add Room</Button>
      </div>

      <div className="grid gap-4">
        {palace.map((room, rIdx) => (
          <Card key={rIdx} className="p-4">
            <CardContent>
              <div className="flex justify-between items-center">
                <Input
                  value={room.name}
                  onChange={(e) => updateRoomName(rIdx, e.target.value)}
                />
                <Button variant="destructive" onClick={() => deleteRoom(rIdx)}>
                  Delete Room
                </Button>
              </div>
              <PointsEditor
                points={room.points}
                onAdd={(point) => addPoint(rIdx, point)}
                onUpdate={(pIdx, point) => updatePoint(rIdx, pIdx, point)}
                onDelete={(pIdx) => deletePoint(rIdx, pIdx)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PointsEditor({ points, onAdd, onUpdate, onDelete }) {
  const [pointName, setPointName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleAdd = () => {
    if (!pointName.trim()) return;
    onAdd({ name: pointName, image: imageURL });
    setPointName("");
    setImageURL("");
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg mb-2">Points</h2>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Point name"
          value={pointName}
          onChange={(e) => setPointName(e.target.value)}
        />
        <Input
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <Button onClick={handleAdd}>Add Point</Button>
      </div>

      <div className="grid gap-2">
        {points.map((point, idx) => (
          <Card key={idx} className="p-2">
            <CardContent className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {point.image && (
                  <img
                    src={point.image}
                    alt="point"
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <Input
                  value={point.name}
                  onChange={(e) =>
                    onUpdate(idx, { ...point, name: e.target.value })
                  }
                />
              </div>
              <Button variant="destructive" onClick={() => onDelete(idx)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

