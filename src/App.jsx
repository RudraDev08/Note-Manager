import { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import SortControls from './components/Controls';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [editNote, setEditNote] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Personal Notes Manager</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/5">
          <NoteForm editNote={editNote} setEditNote={setEditNote} />
        </div>
        
        <div className="lg:w-3/5">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SortControls sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>
            <div className="p-4">
              <NoteList 
                searchTerm={searchTerm} 
                sortBy={sortBy} 
                setEditNote={setEditNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;