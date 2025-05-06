import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import BASE_URL from '../config';
import logo from '../assets/logo.jpg';
import backgroundVideo from '../assets/backgraung.mp4'; // videonu da import et

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://api-park.nmtech.az/e-parking/api/v0/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log("Login Success:", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Yanlış istifadəçi adı və ya şifrə");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Serverə qoşulmada problem var");
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <video autoPlay muted loop className={styles.backgroundvideo}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className={styles.loginmain}>
        <img src={logo} alt="NMSoft" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.name}
            type="text"
            placeholder='İstifadəçi adı'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className={styles.password}
            type="password"
            placeholder='Şifrə'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <br />
          <button className={styles.loginbutton} type="submit">
            Daxil ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;