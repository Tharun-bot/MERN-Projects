import { useState, useEffect, useCallback } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteService from './services/NoteService';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-amber-50 border-amber-300 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-700',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium max-w-sm ${colors[type] || colors.error}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 text-lg leading-none">&times;</button>
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editNote, setEditNote] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const handleError = (err) => {
    if (err.response?.status === 429) {
      showToast('Too many requests. Please wait and try again.', 'warning');
    } else if (err.response?.status === 500) {
      showToast('Server error occurred.', 'error');
    } else {
      showToast('Something went wrong. Please try again.', 'error');
    }
  };

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await NoteService.getNotes();
      setNotes(res.data || []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async (data) => {
    try {
      const res = await NoteService.createNote(data);
      setNotes((prev) => [res.data, ...prev]);
      showToast('Note created!', 'success');
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const id = editNote._id || editNote.id;
      const res = await NoteService.updateNote(id, data);
      setNotes((prev) => prev.map((n) => (n._id === id || n.id === id) ? res.data : n));
      setEditNote(null);
      showToast('Note updated!', 'success');
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await NoteService.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id && n.id !== id));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f0]">
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📓</span>
            <span className="font-bold text-stone-800 text-xl tracking-tight">Notes App</span>
          </div>
          <span className="text-xs text-stone-400 font-medium bg-stone-100 px-3 py-1 rounded-full">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <NoteForm
          onSubmit={editNote ? handleUpdate : handleCreate}
          editNote={editNote}
          onCancel={() => setEditNote(null)}
        />
        <NoteList
          notes={notes}
          loading={loading}
          onEdit={setEditNote}
          onDelete={handleDelete}
        />
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}