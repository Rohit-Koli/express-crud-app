//Creating a simple crud Application 

let users = [];
let idCounter = 1;

// Create a new user
export const setUser = (req, resp) => {
    const userData = { id: idCounter++, ...req.body };
    users.push(userData);
    resp.status(201).json({
        message: 'User created successfully',
        user: userData
    });   
};

// Get user by ID (query param ?id=)
export const getUser = (req, resp) => {
    const userId = parseInt(req.query.id);
    const userFound = users.find(u => u.id === userId);

    if (userFound) {
        resp.status(200).json({
            message: 'User found',
            user: userFound
        });
    } else {
        resp.status(404).json({ message: 'User not found' });
    }
};

// Delete user by ID (query param ?id=)
export const deleteUser = (req, resp) => {
    const userId = parseInt(req.query.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        resp.status(200).json({ message: 'User deleted successfully' });
    } else {
        resp.status(404).json({ message: 'User not found' });
    }
};

// Update user by ID (query param ?id=)
export const updateUser = (req, resp) => {
    const userId = parseInt(req.query.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        resp.status(200).json({
            message: 'User updated successfully',
            user: users[userIndex]
        });
    } else {
        resp.status(404).json({ message: 'User not found' });
    }
};