import { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, editNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title || '');
      setContent(editNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    await onSubmit({ title: title.trim(), content: content.trim() });
    setLoading(false);
    if (!editNote) {
      setTitle('');
      setContent('');
    }
  };

  const isEdit = !!editNote;

  return (
    <div className={`bg-white border ${isEdit ? 'border-amber-400' : 'border-stone-200'} rounded-2xl p-6 shadow-sm transition-all`}>
      <h2 className="font-display text-xl font-semibold text-stone-800 mb-5">
        {isEdit ? '✏️ Edit Note' : '+ New Note'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            required
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm font-body"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-1.5">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            required
            rows={4}
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm font-body resize-none scrollbar-thin"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="flex-1 bg-stone-800 hover:bg-stone-700 disabled:bg-stone-300 text-white font-medium py-2.5 px-5 rounded-xl transition-all text-sm tracking-wide"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Note' : 'Add Note'}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 border border-stone-200 hover:border-stone-400 text-stone-600 font-medium rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}