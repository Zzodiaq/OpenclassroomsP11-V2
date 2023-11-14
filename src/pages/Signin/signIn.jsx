import '../../styles/sign-style/sign.css';
import React, { useState, useEffect } from 'react';
import { userConnected } from '../../actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function SignIn() {
  // Utilisation du hook de navigation de React Router
  const navigate = useNavigate();

  // États pour stocker les valeurs des champs de formulaire et l'état de la connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  // Utilisation du Redux pour la gestion de l'état global
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.connected);

  // Effet useEffect pour rediriger l'utilisateur s'il est connecté
  useEffect(() => {
    if (isConnected) {
      navigate("/user");
    }
  }, [isConnected, navigate]);

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Appel à l'API pour la connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Extraction du token de la réponse
        const responseData = await response.json();
        const token = responseData.body.token;

        try {
          // Appel à l'API pour obtenir le profil de l'utilisateur connecté
          const res = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email, password }),
          });

          if (res.ok) {
            // Extraction des données du profil
            const resdata = await res.json();
            const username = resdata.body.firstName;
            console.log(resdata)
            // Dispatch d'une action Redux pour indiquer la connexion de l'utilisateur
            dispatch(userConnected(username, token));

            // Redirection vers la page utilisateur
            navigate("/user");
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error);
        }
      } else {
        // Affichage d'un message d'erreur si la connexion échoue
        setLoginFailed(true);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  // Rendu du composant
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          {/* Champ de saisie pour l'adresse e-mail */}
          <div className="input-wrapper">
            <label htmlFor="username">Mail</label>
            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/* Champ de saisie pour le mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* Message d'erreur en cas d'échec de connexion */}
            {loginFailed && <p className='error-Sign'>Invalid mail or password, please try again</p>}
          </div>
          {/* Case à cocher pour se souvenir de l'utilisateur */}
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* Bouton de connexion */}
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}

// Export du composant SignIn
export default SignIn;
