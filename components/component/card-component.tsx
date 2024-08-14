import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon, PinIcon, TrashIcon } from "lucide-react";
import EditNoteDialog from "./edit-note";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdOn: string;
  pinned: boolean; // Ensure this field is included
}

interface CardComponentProps {
  item: Note;
  onDelete: (noteId: string) => void; 
  onUpdate: (updatedNote: Note) => Promise<void>;
  onPin: (noteId: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ item, onDelete, onUpdate, onPin }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handlePinClick = async () => {
    await onPin(item._id);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="space-y-1">
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">{formatDate(item.createdOn)}</span>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePinClick}
              >
                <PinIcon className="h-5 w-5" />
                <span className="sr-only">Pin</span>
              </Button>
              <Button onClick={() => setIsEditDialogOpen(true)} variant="ghost" size="icon">
                <FilePenLineIcon className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button onClick={() => onDelete(item._id)} variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isEditDialogOpen && (
        <EditNoteDialog 
          noteToEdit={item} 
          onUpdateNote={async (updatedNote) => {
            await onUpdate(updatedNote);
            setIsEditDialogOpen(false);
          }} 
          onClose={() => setIsEditDialogOpen(false)} 
        />
      )}
    </>
  );
};

export default CardComponent;
