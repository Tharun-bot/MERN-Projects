import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/note',  // changed 5000 → 5001
  headers: {
    'Content-Type': 'application/json',
  },
});

const NoteService = {
  getNotes: () => api.get('/'),
  getNote: (id) => api.get(`/${id}`),
  createNote: (data) => api.post('/', data),
  updateNote: (id, data) => api.put(`/${id}`, data),
  deleteNote: (id) => api.delete(`/${id}`),
};

export default NoteService;