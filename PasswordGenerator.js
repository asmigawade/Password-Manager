import React, { useState } from 'react';
import './PasswordGenerator.css' 

const PasswordGenerator = ({ onGenerate }) => {
  const [length, setLength] = useState(12); // Default length
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setGeneratedPassword(newPassword);
    onGenerate(newPassword); // Pass the generated password to the parent component
  };

  return (
    <div className="password-generator">
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
        min="8"
        max="20"
        step="1"
      />
      <button className='pg-btn' onClick={generatePassword}>Generate Password</button>
      {generatedPassword && <p>Generated Password: {generatedPassword}</p>}
    </div>
  );
};

export default PasswordGenerator;
