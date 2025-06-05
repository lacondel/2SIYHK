import { useState, useEffect } from "react";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const { login, email, password, repeatedPassword } = formData;

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
          <h1>Регистрация</h1>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="login"
                name="login"
                value={login}
                placeholder="Введите логин"
                onChange={onChange}
              />
            </div>
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
              <input
                type="text"
                className="form-control"
                id="repeatedPassword"
                name="repeatedPassword"
                value={repeatedPassword}
                placeholder="Повторите пароль"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Зарегистрироваться
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default RegisterForm;
