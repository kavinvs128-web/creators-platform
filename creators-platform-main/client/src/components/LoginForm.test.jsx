import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {

  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument();
  });

  it('allows user to type into email and password fields', async () => {

    const user = userEvent.setup();

    render(<LoginForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);

    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');

    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');

    expect(passwordInput).toHaveValue('password123');
  });

  it('calls onSubmit when form is filled correctly', async () => {

    const mockSubmit = jest.fn();

    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByRole('button', { name: /login/i })
    );

    expect(mockSubmit).toHaveBeenCalled();

    expect(mockSubmit).toHaveBeenCalledTimes(1);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('shows error when fields are empty', async () => {

    const mockSubmit = jest.fn();

    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.click(
      screen.getByRole('button', { name: /login/i })
    );

    expect(
      screen.getByRole('alert')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent(/both fields are required/i);

    expect(mockSubmit).not.toHaveBeenCalled();
  });

});