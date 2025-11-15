// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [editId, setEditId] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API = 'http://localhost:5000/api/students';

  // Load all students + sort newest first
  useEffect(() => {
    axios.get(API)
      .then(res => {
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setStudents(sorted);
      })
      .catch(err => console.error('Load error:', err));
  }, []);

  const resetForm = () => {
    setName('');
    setAge('');
    setYearLevel('');
    setGrade('');
    setEmail('');
    setAddress('');
    setMobileNumber('');
    setEditId(null);
  };

  // ---------- SUBMIT (Add / Update) ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !age || isNaN(age) || age < 1 ||
      !yearLevel.trim() ||
      !grade || isNaN(grade) || grade < 0 || grade > 100 ||
      !email.trim() ||
      !address.trim() ||
      !mobileNumber.trim()
    ) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const payload = {
      name: name.trim(),
      age: Number(age),
      yearLevel: yearLevel.trim(),
      grade: Number(grade),
      email: email.trim(),
      address: address.trim(),
      mobileNumber: mobileNumber.trim()
    };

    try {
      if (editId) {
        // ----- UPDATE -----
        await axios.put(`${API}/${editId}`, payload);
        setStudents(prev => prev.map(s =>
          s.id === editId
            ? {
                ...s,
                ...payload,
                year_level: payload.yearLevel,
                mobile_number: payload.mobileNumber   // <-- MAP HERE
              }
            : s
        ));
        alert('Student updated!');
      } else {
        // ----- ADD (new student at top) -----
        const res = await axios.post(API, payload);
        const newStudent = {
          ...payload,
          id: res.data.id,
          year_level: payload.yearLevel,
          mobile_number: payload.mobileNumber   // <-- MAP HERE
        };
        setStudents(prev => [newStudent, ...prev]);   // top of list
        alert('Student added!');
      }
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Server error: ' + (err.response?.data?.error || err.message));
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  // ---------- EDIT ----------
  const handleEdit = (id) => {
    const s = students.find(x => x.id === id);
    if (!s) return;
    setName(s.name);
    setAge(String(s.age));
    setYearLevel(s.year_level || '');
    setGrade(String(s.grade));
    setEmail(s.email || '');
    setAddress(s.address || '');
    setMobileNumber(s.mobile_number || '');
    setEditId(id);
  };

  // ---------- VIEW ----------
  const handleView = (id) => {
    const s = students.find(x => x.id === id);
    if (s) setViewStudent(s);
  };

  const closeModal = () => setViewStudent(null);

  // ---------- SEARCH ----------
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>Student Management System</h1>
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
          <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="Age" min="1" required />
          <input value={yearLevel} onChange={e => setYearLevel(e.target.value)} placeholder="Year Level (e.g., 1st Year)" required />
          <input value={grade} onChange={e => setGrade(e.target.value)} type="number" placeholder="Grade (0–100)" min="0" max="100" required />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
          <input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} type="tel" placeholder="Mobile Number" required />

          <div className="form-buttons">
            <button type="submit">
              {editId ? 'Update Student' : 'Add Student'}
            </button>
            {editId && (
              <button type="button" onClick={resetForm}
                style={{ marginLeft: '10px', background: '#666', color: '#fff' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="students-list">
        <h2>Students List ({filtered.length})</h2>
        {filtered.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Year Level</th>
                <th>Grade</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.year_level || '—'}</td>
                  <td>{s.grade}</td>
                  <td>{s.mobile_number || '—'}</td>
                  <td className="actions">
                    <button className="view-btn" onClick={() => handleView(s.id)}>View</button>
                    <button className="edit-btn" onClick={() => handleEdit(s.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------- VIEW MODAL ---------- */}
      {viewStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Student Details</h3>
            <p><strong>Name:</strong> {viewStudent.name}</p>
            <p><strong>Age:</strong> {viewStudent.age}</p>
            <p><strong>Year Level:</strong> {viewStudent.year_level || '—'}</p>
            <p><strong>Grade:</strong> {viewStudent.grade}</p>
            <p><strong>Email:</strong> {viewStudent.email || 'N/A'}</p>
            <p><strong>Address:</strong> {viewStudent.address || 'N/A'}</p>
            <p><strong>Mobile:</strong> {viewStudent.mobile_number || 'N/A'}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;