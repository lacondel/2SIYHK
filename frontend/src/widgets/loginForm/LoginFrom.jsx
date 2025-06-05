import { useState, useEffect } from "react";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.formContainer}>
        <section className="heading">
          <h1>Авторизация</h1>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Введите email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Введите пароль"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Войти
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginForm;
