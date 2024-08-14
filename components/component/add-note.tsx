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
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";

interface AddNoteDialogProps {
  onAddNote: (newNote: { title: string; description: string; createdOn?: string }) => Promise<void>;
  onClose: () => void;
}

export default function AddNoteDialog({ onAddNote, onClose }: AddNoteDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await onAddNote({
      title,
      description,
      createdOn: new Date().toISOString(),
    });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="uppercase">Add New Note</DialogTitle>
          <DialogDescription>Add a new note to your collection</DialogDescription>
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
          <Button type="button" onClick={handleSubmit} className="text-sm">Add</Button>
          <Button type="button" className="border text-sm rounded-md p-2" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
