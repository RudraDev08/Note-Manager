import { useState, useEffect, useRef } from 'react';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function NoteForm({ editNote, setEditNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title || '');
      setContent(editNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
    titleRef.current?.focus();
  }, [editNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    const timestamp = serverTimestamp();

    try {
      if (editNote && editNote.id) {
        // Update existing note
        const noteRef = doc(db, "notes", editNote.id);
        await updateDoc(noteRef, {
          title,
          content,
          updatedAt: timestamp,
        });
        alert('Note updated successfully!');
        setEditNote(null);
      } else {
        // Add new note
        await addDoc(collection(db, "notes"), {
          title,
          content,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
        alert('Note added successfully!');
      }

      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error writing document: ", error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {editNote ? 'Edit Note' : 'Add New Note'}
        </h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter note title"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter note content"
            />
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              {editNote ? 'Update Note' : 'Save Note'}
            </button>

            {editNote && (
              <button
                type="button"
                onClick={() => {
                  setEditNote(null);
                  setTitle('');
                  setContent('');
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
