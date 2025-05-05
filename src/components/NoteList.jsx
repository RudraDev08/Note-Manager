import useLocalStorage from '../hooks/useLocalStorage';
import NoteItem from './NoteItem';

function NoteList({ searchTerm, sortBy, setEditNote }) {
  const [notes, setNotes] = useLocalStorage('notes', []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
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
          />
        ))
      )}
    </div>
  );
}

export default NoteList;