import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PasswordGenerator from './PasswordGenerator';
import PasswordStrengthMeter from './PasswordStrength';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSearch, faCopy } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [passwordList, setPasswordList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3001/showpasswords').then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  // const addPassword = () => {
  //   Axios.post('http://localhost:3001/addpassword', {
  //     password: password,
  //     title: title,
  //   }).then((response) => {
  //     const newPasswordData = response.data; // Assuming the backend sends back the newly added password data including the ID and IV
  //     setPasswordList([...passwordList, newPasswordData]);
  //     setPassword('');
  //     setTitle('');
  //   });
  // };

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
      password: password,
      title: title,
    }).then((response) => {
      const newPasswordData = response.data;
      setPasswordList([...passwordList, newPasswordData]);
      setPassword('');
      setTitle('');
    }).catch((error) => {
      console.error('Error adding password:', error);
      alert('Failed to add password. Please try again.');
    });
  };
  

  
  const copyPassword = (encryption) => {
    Axios.post('http://localhost:3001/decryptpassword', {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      const tempInput = document.createElement('input');
      tempInput.value = response.data; // Decrypted password
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      alert('Password copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying password:', error);
      alert('Failed to copy password. Please try again.');
    });
  };

  const deletePassword = (id) => {
    Axios.delete(`http://localhost:3001/deletepassword/${id}`).then(() => {
      setPasswordList(passwordList.filter((val) => val.id !== id));
    });
  };

  // const filteredPasswords = passwordList.filter((entry) =>
  //   entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredPasswords = passwordList.filter((entry) =>
    (entry.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="App">
      <h1>My Personal Password Manager</h1>
      <hr />
      <div className="AddingPassword">
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setIsGenerating(false);
            }}
            disabled={isGenerating}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <input
          type="text"
          placeholder="For what is this password?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
         <PasswordStrengthMeter password={password} />
        <button className='submit-button' onClick={addPassword}>Add Password</button>
        <button className="generate-button" onClick={() => setIsGenerating(true)}>Generate Password</button>
        {isGenerating && <PasswordGenerator onGenerate={(generatedPassword) => {
          setPassword(generatedPassword);
          setIsGenerating(false);
        }} />}
      </div>

      <div className="Search">
        <input
          type="text"
          placeholder="Search passwords"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      <div className="Passwords">
        {filteredPasswords.map((val, key) => (
          <div className="password" key={key}>
            <h3>{val.title}</h3>
            <div className="buttons">
              <button onClick={() => copyPassword(val)}>
                <FontAwesomeIcon icon={faCopy} /> Copy Password
              </button>
              <button onClick={() => deletePassword(val.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
