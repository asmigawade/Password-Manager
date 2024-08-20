import React from 'react';
import './PasswordStrengthMeter.css'; // Create this CSS file for styling

const getStrength = (password) => {
  if (password.length === 0) return { strength: 0, message: 'Enter a password' };

  const lengthCriteria = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let score = 0;
  if (lengthCriteria) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  const strengthMessages = [
    'Very Weak',
    'Weak',
    'Moderate',
    'Strong',
    'Very Strong'
  ];

  return { strength: score, message: strengthMessages[score] || 'Very Weak' };
};

const PasswordStrengthMeter = ({ password }) => {
  const { strength, message } = getStrength(password);

  return (
    <div className="strength-meter">
      <div className={`strength-bar strength-${strength}`}></div>
      <span className="strength-message">{message}</span>
    </div>
  );
};

export default PasswordStrengthMeter;
