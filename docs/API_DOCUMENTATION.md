# API Documentation

## Overview

This document provides comprehensive documentation for all public APIs, functions, and components in the mobile application.

## Table of Contents

- [Authentication APIs](#authentication-apis)
- [Core APIs](#core-apis)
- [Component Library](#component-library)
- [Utility Functions](#utility-functions)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Authentication APIs

### `auth.login(credentials)`

Authenticates a user with email and password.

**Parameters:**
- `credentials` (Object): User login credentials
  - `email` (string): User's email address
  - `password` (string): User's password

**Returns:**
- `Promise<AuthResponse>`: Authentication response containing user data and token

**Example:**
```javascript
const credentials = {
  email: "user@example.com",
  password: "securePassword123"
};

try {
  const response = await auth.login(credentials);
  console.log('Login successful:', response.user);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

**Error Codes:**
- `AUTH_INVALID_CREDENTIALS`: Invalid email or password
- `AUTH_USER_NOT_FOUND`: User account does not exist
- `AUTH_ACCOUNT_LOCKED`: User account is temporarily locked

### `auth.logout()`

Logs out the current user and clears authentication tokens.

**Returns:**
- `Promise<void>`: Resolves when logout is complete

**Example:**
```javascript
await auth.logout();
console.log('User logged out successfully');
```

### `auth.register(userData)`

Registers a new user account.

**Parameters:**
- `userData` (Object): New user registration data
  - `email` (string): User's email address
  - `password` (string): User's password (minimum 8 characters)
  - `firstName` (string): User's first name
  - `lastName` (string): User's last name

**Returns:**
- `Promise<AuthResponse>`: Registration response containing user data

**Example:**
```javascript
const userData = {
  email: "newuser@example.com",
  password: "securePassword123",
  firstName: "John",
  lastName: "Doe"
};

try {
  const response = await auth.register(userData);
  console.log('Registration successful:', response.user);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

## Core APIs

### `api.get(endpoint, options)`

Makes a GET request to the specified endpoint.

**Parameters:**
- `endpoint` (string): API endpoint path
- `options` (Object, optional): Request options
  - `headers` (Object): Additional headers
  - `params` (Object): Query parameters
  - `timeout` (number): Request timeout in milliseconds

**Returns:**
- `Promise<ApiResponse>`: Response data from the API

**Example:**
```javascript
// Simple GET request
const users = await api.get('/users');

// GET request with parameters
const filteredUsers = await api.get('/users', {
  params: { role: 'admin', limit: 10 }
});

// GET request with custom headers
const data = await api.get('/protected-data', {
  headers: { 'Custom-Header': 'value' }
});
```

### `api.post(endpoint, data, options)`

Makes a POST request to the specified endpoint.

**Parameters:**
- `endpoint` (string): API endpoint path
- `data` (Object): Request payload
- `options` (Object, optional): Request options

**Returns:**
- `Promise<ApiResponse>`: Response data from the API

**Example:**
```javascript
const newUser = {
  name: "Jane Smith",
  email: "jane@example.com"
};

const createdUser = await api.post('/users', newUser);
console.log('User created:', createdUser);
```

### `api.put(endpoint, data, options)`

Makes a PUT request to update a resource.

**Parameters:**
- `endpoint` (string): API endpoint path
- `data` (Object): Updated resource data
- `options` (Object, optional): Request options

**Returns:**
- `Promise<ApiResponse>`: Updated resource data

**Example:**
```javascript
const updatedData = {
  name: "Jane Doe",
  email: "jane.doe@example.com"
};

const updatedUser = await api.put('/users/123', updatedData);
```

### `api.delete(endpoint, options)`

Makes a DELETE request to remove a resource.

**Parameters:**
- `endpoint` (string): API endpoint path
- `options` (Object, optional): Request options

**Returns:**
- `Promise<void>`: Resolves when deletion is complete

**Example:**
```javascript
await api.delete('/users/123');
console.log('User deleted successfully');
```

## Component Library

### `Button`

A customizable button component with various styles and states.

**Props:**
- `title` (string, required): Button text
- `onPress` (function, required): Callback function when button is pressed
- `variant` (string, optional): Button style variant ('primary', 'secondary', 'outline')
- `size` (string, optional): Button size ('small', 'medium', 'large')
- `disabled` (boolean, optional): Whether button is disabled
- `loading` (boolean, optional): Whether button shows loading state

**Example:**
```jsx
// React Native / React
<Button
  title="Save Changes"
  onPress={handleSave}
  variant="primary"
  size="large"
  loading={isLoading}
/>

// Flutter (Dart)
Button(
  title: "Save Changes",
  onPressed: handleSave,
  variant: ButtonVariant.primary,
  size: ButtonSize.large,
  loading: isLoading,
)
```

### `TextInput`

A text input component with validation and formatting capabilities.

**Props:**
- `value` (string): Current input value
- `onChangeText` (function): Callback when text changes
- `placeholder` (string, optional): Placeholder text
- `secureTextEntry` (boolean, optional): Whether to hide text (for passwords)
- `keyboardType` (string, optional): Keyboard type ('default', 'email', 'numeric')
- `validation` (Object, optional): Validation rules
- `error` (string, optional): Error message to display

**Example:**
```jsx
// React Native / React
<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  keyboardType="email"
  validation={{ required: true, email: true }}
  error={emailError}
/>

// Flutter (Dart)
TextInput(
  value: email,
  onChanged: setEmail,
  placeholder: "Enter your email",
  keyboardType: TextInputType.emailAddress,
  validation: ValidationRules(required: true, email: true),
  error: emailError,
)
```

### `Modal`

A modal dialog component for displaying content in an overlay.

**Props:**
- `visible` (boolean): Whether modal is visible
- `onClose` (function): Callback when modal should close
- `title` (string, optional): Modal title
- `children` (ReactNode): Modal content
- `animationType` (string, optional): Animation type ('slide', 'fade', 'none')

**Example:**
```jsx
// React Native / React
<Modal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  animationType="slide"
>
  <Text>Are you sure you want to delete this item?</Text>
  <Button title="Cancel" onPress={() => setShowModal(false)} />
  <Button title="Delete" onPress={handleDelete} variant="danger" />
</Modal>

// Flutter (Dart)
Modal(
  visible: showModal,
  onClose: () => setShowModal(false),
  title: "Confirm Action",
  animationType: AnimationType.slide,
  child: Column(
    children: [
      Text("Are you sure you want to delete this item?"),
      Button(title: "Cancel", onPressed: () => setShowModal(false)),
      Button(title: "Delete", onPressed: handleDelete, variant: ButtonVariant.danger),
    ],
  ),
)
```

## Utility Functions

### `formatCurrency(amount, currency)`

Formats a number as currency with proper locale formatting.

**Parameters:**
- `amount` (number): Amount to format
- `currency` (string, optional): Currency code (default: 'USD')

**Returns:**
- `string`: Formatted currency string

**Example:**
```javascript
const price = formatCurrency(1234.56, 'USD');
// Returns: "$1,234.56"

const euroPrice = formatCurrency(1234.56, 'EUR');
// Returns: "€1,234.56"
```

### `validateEmail(email)`

Validates an email address format.

**Parameters:**
- `email` (string): Email address to validate

**Returns:**
- `boolean`: True if email is valid, false otherwise

**Example:**
```javascript
const isValid = validateEmail("user@example.com");
// Returns: true

const isInvalid = validateEmail("invalid-email");
// Returns: false
```

### `debounce(func, delay)`

Creates a debounced version of a function that delays execution.

**Parameters:**
- `func` (function): Function to debounce
- `delay` (number): Delay in milliseconds

**Returns:**
- `function`: Debounced function

**Example:**
```javascript
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Usage in input handler
const handleSearchInput = (text) => {
  debouncedSearch(text);
};
```

### `deepClone(obj)`

Creates a deep copy of an object.

**Parameters:**
- `obj` (any): Object to clone

**Returns:**
- `any`: Deep cloned object

**Example:**
```javascript
const original = { user: { name: 'John', settings: { theme: 'dark' } } };
const cloned = deepClone(original);

cloned.user.name = 'Jane';
console.log(original.user.name); // Still 'John'
```

## Error Handling

### Error Types

#### `APIError`

Thrown when API requests fail.

**Properties:**
- `message` (string): Error message
- `statusCode` (number): HTTP status code
- `endpoint` (string): API endpoint that failed

**Example:**
```javascript
try {
  const data = await api.get('/users');
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error ${error.statusCode}: ${error.message}`);
    console.error(`Failed endpoint: ${error.endpoint}`);
  }
}
```

#### `ValidationError`

Thrown when data validation fails.

**Properties:**
- `message` (string): Error message
- `field` (string): Field that failed validation
- `rules` (Array): Validation rules that failed

**Example:**
```javascript
try {
  validateUserData(userData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation failed for ${error.field}: ${error.message}`);
    console.error('Failed rules:', error.rules);
  }
}
```

### Global Error Handler

```javascript
// Set up global error handler
errorHandler.setGlobalHandler((error) => {
  console.error('Global error:', error);
  
  if (error instanceof APIError && error.statusCode === 401) {
    // Handle authentication error
    auth.logout();
    navigation.navigate('Login');
  }
});
```

## Examples

### Complete User Authentication Flow

```javascript
// Login flow with error handling
const handleLogin = async (credentials) => {
  try {
    setLoading(true);
    const response = await auth.login(credentials);
    
    // Store user data
    await storage.setItem('user', response.user);
    await storage.setItem('token', response.token);
    
    // Navigate to main app
    navigation.navigate('Dashboard');
    
  } catch (error) {
    if (error.code === 'AUTH_INVALID_CREDENTIALS') {
      setError('Invalid email or password');
    } else if (error.code === 'AUTH_ACCOUNT_LOCKED') {
      setError('Account temporarily locked. Please try again later.');
    } else {
      setError('Login failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
```

### Data Fetching with Caching

```javascript
// Fetch user data with caching
const fetchUserData = async (userId, useCache = true) => {
  const cacheKey = `user_${userId}`;
  
  if (useCache) {
    const cached = await cache.get(cacheKey);
    if (cached && !cache.isExpired(cacheKey)) {
      return cached;
    }
  }
  
  try {
    const userData = await api.get(`/users/${userId}`);
    await cache.set(cacheKey, userData, { ttl: 300 }); // 5 minutes
    return userData;
  } catch (error) {
    // Return cached data if API fails
    const cached = await cache.get(cacheKey);
    if (cached) {
      console.warn('API failed, returning cached data');
      return cached;
    }
    throw error;
  }
};
```

### Form Validation Example

```javascript
// Complete form with validation
const UserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await auth.register(formData);
      navigation.navigate('Dashboard');
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <View>
      <TextInput
        value={formData.email}
        onChangeText={(email) => setFormData({ ...formData, email })}
        placeholder="Email"
        keyboardType="email"
        error={errors.email}
      />
      
      <TextInput
        value={formData.password}
        onChangeText={(password) => setFormData({ ...formData, password })}
        placeholder="Password"
        secureTextEntry
        error={errors.password}
      />
      
      <TextInput
        value={formData.confirmPassword}
        onChangeText={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
        placeholder="Confirm Password"
        secureTextEntry
        error={errors.confirmPassword}
      />
      
      <Button
        title="Register"
        onPress={handleSubmit}
        disabled={!formData.email || !formData.password}
      />
      
      {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
    </View>
  );
};
```

## Best Practices

### API Usage
- Always handle errors appropriately
- Use proper HTTP status codes
- Implement request timeouts
- Add retry logic for failed requests
- Cache responses when appropriate

### Component Development
- Keep components small and focused
- Use TypeScript for better type safety
- Implement proper prop validation
- Follow accessibility guidelines
- Write unit tests for components

### Performance
- Implement lazy loading for large datasets
- Use memoization for expensive calculations
- Optimize image loading and caching
- Minimize re-renders in UI components
- Profile and monitor app performance

### Security
- Validate all user inputs
- Sanitize data before display
- Use secure storage for sensitive data
- Implement proper authentication
- Follow OWASP mobile security guidelines

---

For more information, see the individual component documentation files in the `/docs/components/` directory.