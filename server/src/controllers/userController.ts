import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

interface AuthRequest extends Request {
  user?: any;
}

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, phone, location, profilePicture } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, location, profilePicture },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { settings } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { settings },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('spiritualStats academicStats');
    
    res.json({
      success: true,
      data: {
        ...user?.spiritualStats,
        ...user?.academicStats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolio = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('portfolio');
    
    res.json({
      success: true,
      data: user?.portfolio
    });
  } catch (error) {
    next(error);
  }
};

export const updatePortfolio = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { portfolio } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { portfolio },
      { new: true, runValidators: true }
    ).select('portfolio');
    
    res.json({
      success: true,
      data: user?.portfolio
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    
    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
