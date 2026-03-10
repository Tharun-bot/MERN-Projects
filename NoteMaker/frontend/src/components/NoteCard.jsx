import { useState } from 'react';

export default function NoteCard({ note, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    await onDelete(note._id || note.id);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="group bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200 flex flex-col gap-3">
      {/* Title */}
      <h3 className="font-display font-semibold text-stone-800 text-lg leading-tight line-clamp-2">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        {/* Date */}
        <span className="text-xs text-stone-400">
          {formatDate(note.createdAt || note.updatedAt)}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {confirmDelete ? (
            <>
              <span className="text-xs text-red-500 mr-1">Sure?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-all font-medium"
              >
                {deleting ? '...' : 'Yes'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs border border-stone-200 hover:border-stone-400 text-stone-600 px-3 py-1.5 rounded-lg transition-all font-medium"
              >
                No
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(note)}
                className="text-xs text-stone-400 hover:text-amber-600 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-all font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}