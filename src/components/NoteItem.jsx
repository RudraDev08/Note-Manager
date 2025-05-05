export default function NoteItem({ note, onEdit, onDelete, formatDate }) {
  if (!note) return null; // ✅ Prevents rendering errors

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-800">
            {note.title || 'Untitled Note'} {/* ✅ Fallback title */}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(note)} // ✅ Cleaned up
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition duration-200"
              aria-label="Edit note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition duration-200"
              aria-label="Delete note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-2 text-gray-600 whitespace-pre-line">
          {note.content || 'No content available'} {/* ✅ Fallback content */}
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Last updated: {formatDate(note.updatedAt || note.createdAt)} {/* ✅ Safer timestamp */}
        </p>
      </div>
    </div>
  );
}
