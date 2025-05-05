import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this is correctly imported
import NoteItem from './NoteItem';

function NoteList({ searchTerm, sortBy, setEditNote }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Query Firestore for all notes
    const q = query(collection(db, "notes"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesData); // Update state with notes from Firestore
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    const dateA = a.updatedAt?.seconds || a.createdAt?.seconds || 0;
    const dateB = b.updatedAt?.seconds || b.createdAt?.seconds || 0;

    if (sortBy === 'newest') {
      return dateB - dateA;
    } else if (sortBy === 'oldest') {
      return dateA - dateB;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id)); // Delete note from Firestore
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return 'No date';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div className="space-y-4">
      {sortedNotes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {notes.length === 0 ? 'No notes yet. Add your first note!' : 'No matching notes found.'}
        </div>
      ) : (
        sortedNotes.map(note => (
          <NoteItem 
            key={note.id}
            note={note} 
            onEdit={setEditNote} 
            onDelete={handleDelete}
            formatDate={formatFirebaseTimestamp}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;
