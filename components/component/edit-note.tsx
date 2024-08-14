import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdOn: string;
  pinned: boolean;
}

interface EditNoteDialogProps {
  noteToEdit: Note;
  onUpdateNote: (updatedNote: Note) => Promise<void>;  // Ensure it returns a Promise<void>
  onClose: () => void;
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ noteToEdit, onUpdateNote, onClose }) => {
  const [title, setTitle] = useState(noteToEdit.title);
  const [description, setDescription] = useState(noteToEdit.description);

  const handleSubmit = async () => {
    const updatedNote = { ...noteToEdit, title, description };
    await onUpdateNote(updatedNote);  // Ensure awaiting the promise
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="uppercase">Edit Note</DialogTitle>
          <DialogDescription>Update the details of your note</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="uppercase">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="uppercase">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="gap-4">
          <Button type="button" onClick={handleSubmit} className="text-sm">Edit</Button>
          <Button type="button" className="border text-sm rounded-md p-2" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;
