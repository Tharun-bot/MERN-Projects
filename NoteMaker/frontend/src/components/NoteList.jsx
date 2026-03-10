import NoteCard from './NoteCard';

export default function NoteList({ notes, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-stone-400 text-sm">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">📝</div>
        <p className="text-stone-500 font-medium">No notes yet</p>
        <p className="text-stone-400 text-sm mt-1">Create your first note above</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-4">
        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id || note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}