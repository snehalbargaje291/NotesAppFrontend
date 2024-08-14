'use client'
import React, { useEffect, useState } from "react";
import CardComponent from "@/components/component/card-component";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import AddNoteDialog from "@/components/component/add-note";
import { Navbar } from "@/components/component/navbar";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdOn: string;
  pinned: boolean; // Ensure this field is included
}

const HomePage = () => {
  const [items, setItems] = useState<Note[]>([]);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);

  const fetchData = async (searchQuery: string = '') => {
    try {
      const url = searchQuery
        ? `http://localhost:8000/notes/search?q=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:8000/notes';
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      // Convert boolean to number for sorting
      const sortedItems = data.data.sort((a: Note, b: Note) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, show a user-friendly error message
    }
  };
  
    
  const handleAddNote = async (newNote: { title: string; description: string; createdOn?: string }) => {
    try {
      const response = await fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(newNote)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setItems((prevItems) => [...prevItems, data.data]);
      setIsAddNoteDialogOpen(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleUpdateNote = async (updatedNote: Note) => {
    try {
      const response = await axios.put(`http://localhost:8000/notes/${updatedNote._id}`, updatedNote, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const updatedData = response.data.data;
      setItems((prevItems) => {
        const updatedItems = prevItems.map(item => item._id === updatedData._id ? updatedData : item);
        return updatedItems.sort((a, b) => b.pinned - a.pinned);
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setItems((prevItems) => prevItems.filter(item => item._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleAddClick = () => {
    setIsAddNoteDialogOpen(true);
  };

  const handleSearch = (query: string) => {
    fetchData(query);
  };

  const handlePinNote = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/pin/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ pinned: true })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedNote = await response.json();
      setItems((prevItems) => {
        const updatedItems = prevItems.map(item => item._id === updatedNote.data._id ? updatedNote.data : item);
        return updatedItems.sort((a, b) => b.pinned - a.pinned);
      });
    } catch (error) {
      console.error('Error pinning note:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen mt-24 bg-background">
      <Navbar onSearch={handleSearch} />
      <h1 className="text-3xl font-bold m-8">MyNotes :</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-4">
        {items.map((item) => (
          <CardComponent 
            key={item._id} 
            item={item} 
            onUpdate={handleUpdateNote} 
            onDelete={handleDeleteNote}
            onPin={handlePinNote} // Pass the pin handler
          />
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={handleAddClick} className="bg-background text-foreground hover:bg-primary-foreground flex items-center">
          <BiPlus className="mr-2" />
          Add Note
        </Button>
      </div>
      {isAddNoteDialogOpen && (
        <AddNoteDialog onAddNote={handleAddNote} onClose={() => setIsAddNoteDialogOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
