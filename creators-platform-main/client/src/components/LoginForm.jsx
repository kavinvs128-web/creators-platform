import { useState } from 'react';

const LoginForm = ({ onSubmit }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error while typing
    setError('');
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    // validation
    if (!formData.email || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        Login
      </button>

    </form>
  );
};

export default LoginForm;