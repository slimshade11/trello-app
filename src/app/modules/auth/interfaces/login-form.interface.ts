import { RegisterForm } from '@auth/interfaces/register-form.interface';

export type LoginForm = Omit<RegisterForm, 'username'>;
