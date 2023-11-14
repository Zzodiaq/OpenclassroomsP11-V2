import React, { useState } from 'react';
import '../../styles/user-style/user.css';
import balanceData from '../../balance-data.json';
import CardArgent from '../../components/CardArgent/cardargent.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { updateUsername } from '../../actions.js';

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');


  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setNewUsername('');
  };


  const handleUsernameUpdate = async () => {
    try {
      const requestBody = JSON.stringify({
        firstName: newUsername,
        lastName: "string"
      });
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: requestBody
      });
  
      if (response.ok) {
        dispatch(updateUsername(newUsername));
        setNewUsername('');
        setIsEditing(false);
      } else {
        console.error('Erreur lors de la mise à jour du nom d\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
    }
  }

  return (
    <div className='userContainer'>
      {/* Affichage différent en fonction du mode d'édition */}
      {isEditing ? (
        <div className='userNameEditOn'>
          <h1>Edit user info</h1>
          <div className='editNameInput'>
            <p>User name : </p>
            {/* Champ de saisie pour le nouveau nom d'utilisateur */}
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder={username}
            />
          </div>
          {/* Boutons pour sauvegarder ou annuler l'édition */}
          <div className='btnEdit'>
            <button className='save' onClick={handleUsernameUpdate}>Save</button>
            <button className='cancel' onClick={handleEditCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className='userNameEdit'>
          {/* Affichage du nom d'utilisateur actuel et bouton pour démarrer l'édition */}
          <h1>Welcome back <br /> {username}!</h1>
          <button className='edit-button' onClick={handleEditClick}>Edit Name</button>
        </div>
      )}

      {/* Affichage des cartes d'argent à partir des données statiques */}
      <div className='cardArgent'>
        {balanceData.map((e) => {
          return <CardArgent id={e.id} title={e.title} money={e.money} subtitle={e.subtitle} />;
        })}
      </div>
    </div>
  );
}

// Export du composant User
export default User;
