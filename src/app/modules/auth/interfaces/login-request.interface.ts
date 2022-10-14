import { RegisterRequest } from '@auth/interfaces/register-request.interface';

export type LoginRequest = Omit<RegisterRequest, 'username'>;
