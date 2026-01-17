// Simple in-memory user storage (for demo purposes)
// In production, this would be replaced with actual backend API calls

let registeredUsers = [];

export const userStorage = {
  // Register a new user
  registerUser: (userData) => {
    const { name, email, password } = userData;
    
    // Check if user already exists
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
      isVerified: false,
    };

    registeredUsers.push(newUser);
    return { success: true, message: 'Account created successfully', user: newUser };
  },

  // Verify user's Aadhar
  verifyUser: (email) => {
    const user = registeredUsers.find(u => u.email === email);
    if (user) {
      user.isVerified = true;
      return { success: true, message: 'User verified successfully' };
    }
    return { success: false, message: 'User not found' };
  },

  // Login user
  loginUser: (email, password) => {
    const user = registeredUsers.find(u => u.email === email);
    
    if (!user) {
      return { 
        success: false, 
        message: 'Email is not registered. Please sign up first.' 
      };
    }

    if (user.password !== password) {
      return { 
        success: false, 
        message: 'Incorrect password. Please try again.' 
      };
    }

    if (!user.isVerified) {
      return { 
        success: false, 
        message: 'Please complete Aadhar verification first.',
        needsVerification: true,
        user: user
      };
    }

    return { 
      success: true, 
      message: `Welcome back, ${user.name}!`,
      user: user 
    };
  },

  // Check if email exists
  emailExists: (email) => {
    return registeredUsers.some(u => u.email === email);
  },

  // Get user by email
  getUserByEmail: (email) => {
    return registeredUsers.find(u => u.email === email);
  },

  // Get all users (for debugging)
  getAllUsers: () => {
    return registeredUsers;
  },

  // Clear all users (for testing)
  clearAllUsers: () => {
    registeredUsers = [];
  }
};
