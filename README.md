
# Personal Password Manager

## Overview

The Personal Password Manager is a React application designed to securely manage and organize your passwords. The app allows you to add, view, search, and delete passwords. It also includes features for generating and copying passwords, as well as a password strength meter to ensure your passwords are secure.

## Features

- **Add Passwords**: Store passwords with titles and optionally generate new passwords.
- **View Passwords**: Display saved passwords with an option to view or hide them.
- **Search Passwords**: Filter stored passwords by title.
- **Copy Passwords**: Easily copy decrypted passwords to the clipboard.
- **Delete Passwords**: Remove passwords from the list.
- **Password Strength Meter**: Check the strength of your passwords.
- **Password Generator**: Create strong passwords on demand.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/password-manager.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd password-manager
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Configuration

- Ensure you have a backend server running at `http://localhost:3001` that provides endpoints for managing passwords.
- The following API endpoints are used:
  - `GET /showpasswords`: Fetches the list of passwords.
  - `POST /addpassword`: Adds a new password.
  - `POST /decryptpassword`: Decrypts a password for copying.
  - `DELETE /deletepassword/:id`: Deletes a password by ID.

## Usage

1. **Add a Password**:
   - Enter the password and a title for it.
   - Click the "Add Password" button to save.

2. **Generate a Password**:
   - Click the "Generate Password" button to create a new password.
   - The generated password will be displayed and can be added.

3. **Search Passwords**:
   - Type in the search box to filter passwords by title.

4. **Copy a Password**:
   - Click the "Copy Password" button next to a password to copy it to the clipboard.

5. **Delete a Password**:
   - Click the "Delete" button next to a password to remove it.

## Components

- `App`: The main component that manages the state and renders the user interface.
- `PasswordGenerator`: A component for generating random passwords.
- `PasswordStrengthMeter`: A component that displays the strength of the password being entered.

## Dependencies

- `react`: The core React library.
- `axios`: For making HTTP requests.
- `font-awesome`: For icon support.

## Userflow 
![image](https://github.com/user-attachments/assets/0adfd8d9-0362-4def-bf23-c5a5d93a1279)

![image](https://github.com/user-attachments/assets/e8a6673d-6229-4943-8303-6ff2fe8d68f2)

![image](https://github.com/user-attachments/assets/f47099bf-1ed4-43bb-8a4c-84633a30de89)

![image](https://github.com/user-attachments/assets/9e39b546-b600-48ff-8d3a-20bafbdb5349)

![image](https://github.com/user-attachments/assets/a8965021-1137-4d11-adc1-25b9fb425780)

![image](https://github.com/user-attachments/assets/fb79602a-8ecd-4307-a82f-0119e16e6a2c)

![image](https://github.com/user-attachments/assets/b74f7cf4-e4d2-4cb7-9b2b-99d71ca7afd4)
