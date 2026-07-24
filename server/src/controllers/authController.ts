import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password || 'password123', 10);
      const jwtSecret = process.env.JWT_SECRET || 'super_secret_dreamverse_jwt_key_2026';
      
      const token = jwt.sign(
        { userId: 'user-1', email, role: 'Parent' },
        jwtSecret,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Parent account registered successfully',
        user: { id: 'user-1', name, email, role: 'Parent' },
        token
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const jwtSecret = process.env.JWT_SECRET || 'super_secret_dreamverse_jwt_key_2026';

      const token = jwt.sign(
        { userId: 'user-1', email: email || 'parent@dreamverse.ai', role: 'Parent' },
        jwtSecret,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Login successful',
        user: { id: 'user-1', name: 'Parent User', email: email || 'parent@dreamverse.ai', role: 'Parent' },
        token
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public static async logout(req: Request, res: Response) {
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}
