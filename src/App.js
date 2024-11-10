import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/tasks'; // Backend URL'inizi buraya ekleyin
  const TOKEN = 'Bearer YOUR_JWT_TOKEN'; // Geçici olarak sabitlenmiş token

  // Görevleri çekme
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/list`, {
        headers: { Authorization: TOKEN },
      });
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Görevleri yüklerken bir hata oluştu.');
    }
  };

  // Yeni görev ekleme
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        { ...newTask },
        {
          headers: { Authorization: TOKEN },
        }
      );
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', category: '' });
    } catch (err) {
      setError('Görev eklerken bir hata oluştu.');
    }
  };

  // Görev tamamlama
  const completeTask = async (taskId) => {
    try {
      const response = await axios.put(
        `${API_URL}/complete/${taskId}`,
        {},
        {
          headers: { Authorization: TOKEN },
        }
      );
      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)));
    } catch (err) {
      setError('Görev tamamlarken bir hata oluştu.');
    }
  };

  // Görev güncelleme
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `${API_URL}/update/${taskId}`,
        updatedTask,
        {
          headers: { Authorization: TOKEN },
        }
      );
      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)));
    } catch (err) {
      setError('Görev güncellerken bir hata oluştu.');
    }
  };

  // Görev silme
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: TOKEN },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Görev silinirken bir hata oluştu.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Görev Yönetim Uygulaması</h1>
      </header>

      {/* Hata Mesajı */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Görev Listesi */}
      <div className="task-list">
        <h2>Görevler</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small>Kategori: {task.category}</small>
                <br />
                <button onClick={() => completeTask(task._id)} disabled={task.completed}>
                  {task.completed ? 'Tamamlandı' : 'Tamamla'}
                </button>
                <button onClick={() => deleteTask(task._id)}>Sil</button>
                <button onClick={() => updateTask(task._id, { title: 'Yeni Başlık' })}>Başlığı Güncelle</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Görev bulunamadı.</p>
        )}
      </div>

      {/* Yeni Görev Ekleme Formu */}
      <div className="add-task">
        <h2>Yeni Görev Ekle</h2>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Görev Başlığı"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Görev Açıklaması"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Kategori"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          />
          <button type="submit">Görev Ekle</button>
        </form>
      </div>
    </div>
  );
}

export default App;
