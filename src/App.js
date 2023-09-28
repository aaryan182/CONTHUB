import React from 'react';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> <strong>CONTHUB </strong><br/>  Your Contact Manager 📱</h1>
      </header>
      <main>
        <ContactList />
      </main>
      <footer className="App-footer">
        <p>Developed by <strong> Aaryan Bajaj</strong> </p>
      </footer>
    </div>
  );
}

export default App;
