// tests/unit/auth.service.test.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { User, UserRole } from '../../models/entity/user.entity';
import { jwtConfig } from '../../config/jwt.config';

// Mocks automáticos
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../services/user.service');

describe('AuthService', () => {
  const mockUser = new User(
    1,
    'Test User',
    'test@example.com',
    'hashedPassword',
    'Fake Street 123',
    UserRole.USER,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('debería devolver el usuario si el email y la contraseña son válidos', async () => {
      // Mockear getByEmail en lugar de getAll
      jest.spyOn(UserService, 'getByEmail').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await AuthService.validateUser('test@example.com', 'password123');

      expect(UserService.getByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(result).toEqual(mockUser);
    });

    it('debería devolver null si el usuario no existe', async () => {
      jest.spyOn(UserService, 'getByEmail').mockResolvedValue(undefined);

      const result = await AuthService.validateUser('notfound@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('debería devolver null si la contraseña es incorrecta', async () => {
      jest.spyOn(UserService, 'getByEmail').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await AuthService.validateUser('test@example.com', 'wrongpass');

      expect(result).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('debería generar un token JWT correctamente', async () => {
      const fakeToken = 'jwt.token.here';
      (jwt.sign as jest.Mock).mockImplementation((_payload, _secret, _options, callback) => {
        callback(null, fakeToken);
      });

      const token = await AuthService.generateToken(mockUser); // usar await para la version asincronica

      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: mockUser.user_id, role: mockUser.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
        expect.any(Function),
      );
      expect(token).toBe(fakeToken);
    });
  });
});
