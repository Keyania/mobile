# Component Library

## Overview

This component library provides a comprehensive set of reusable UI components designed for mobile applications. The components are built with consistency, accessibility, and performance in mind, supporting multiple platforms including React Native, Flutter, iOS, and Android.

## Design Principles

### Consistency
- Unified design language across all platforms
- Consistent naming conventions and API patterns
- Standardized spacing, colors, and typography

### Accessibility
- WCAG 2.1 compliance
- Screen reader support
- Keyboard navigation
- High contrast support

### Performance
- Optimized for mobile devices
- Minimal re-renders
- Efficient memory usage
- Native performance where possible

### Customization
- Theme support with light/dark modes
- Configurable styling system
- Platform-specific adaptations
- Brand customization capabilities

## Component Categories

### Input Components

#### [Button](./components/Button.md)
Versatile button component with multiple variants and states.

```jsx
<Button title="Save" onPress={handleSave} variant="primary" />
```

**Key Features:**
- Multiple variants (primary, secondary, outline, text, danger)
- Size options (small, medium, large)
- Loading and disabled states
- Icon support
- Full accessibility support

#### [TextInput](./components/TextInput.md)
Text input component with validation and formatting.

```jsx
<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  validation={{ required: true, email: true }}
/>
```

**Key Features:**
- Built-in validation
- Multiple keyboard types
- Secure text entry
- Error state handling
- Formatting options

#### [Checkbox](./components/Checkbox.md)
Checkbox component for boolean selections.

```jsx
<Checkbox
  checked={isChecked}
  onValueChange={setIsChecked}
  label="I agree to the terms"
/>
```

#### [RadioButton](./components/RadioButton.md)
Radio button component for single selections.

```jsx
<RadioButton
  value="option1"
  selected={selectedValue === "option1"}
  onSelect={setSelectedValue}
  label="Option 1"
/>
```

#### [Switch](./components/Switch.md)
Toggle switch component.

```jsx
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Enable notifications"
/>
```

#### [Slider](./components/Slider.md)
Slider component for numeric range selection.

```jsx
<Slider
  value={volume}
  onValueChange={setVolume}
  minimum={0}
  maximum={100}
  step={1}
/>
```

### Display Components

#### [Text](./components/Text.md)
Typography component with theme support.

```jsx
<Text variant="heading1" color="primary">
  Welcome
</Text>
```

#### [Image](./components/Image.md)
Optimized image component with caching.

```jsx
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  placeholder="loading"
/>
```

#### [Icon](./components/Icon.md)
Icon component with extensive icon library.

```jsx
<Icon name="star" size={24} color="gold" />
```

#### [Avatar](./components/Avatar.md)
User avatar component with fallback options.

```jsx
<Avatar
  source={{ uri: userImageUrl }}
  fallback={user.initials}
  size="large"
/>
```

#### [Badge](./components/Badge.md)
Badge component for notifications and status indicators.

```jsx
<Badge count={5} maxCount={99}>
  <Icon name="bell" />
</Badge>
```

### Layout Components

#### [Container](./components/Container.md)
Base container component with padding and margin options.

```jsx
<Container padding="medium" margin="small">
  <Text>Content here</Text>
</Container>
```

#### [Card](./components/Card.md)
Card component for grouped content.

```jsx
<Card elevation={2} padding="medium">
  <Text>Card content</Text>
</Card>
```

#### [List](./components/List.md)
List component for displaying collections.

```jsx
<List
  data={items}
  renderItem={({ item }) => <ListItem title={item.title} />}
  keyExtractor={(item) => item.id}
/>
```

#### [Grid](./components/Grid.md)
Grid component for layout arrangements.

```jsx
<Grid columns={2} spacing="medium">
  {items.map(item => (
    <GridItem key={item.id}>
      <Card>{item.content}</Card>
    </GridItem>
  ))}
</Grid>
```

### Navigation Components

#### [Tab](./components/Tab.md)
Tab component for navigation.

```jsx
<TabView>
  <Tab title="Home" icon="home">
    <HomeScreen />
  </Tab>
  <Tab title="Profile" icon="user">
    <ProfileScreen />
  </Tab>
</TabView>
```

#### [Drawer](./components/Drawer.md)
Drawer component for side navigation.

```jsx
<Drawer
  visible={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  width={280}
>
  <NavigationMenu />
</Drawer>
```

### Feedback Components

#### [Modal](./components/Modal.md)
Modal component for overlays and dialogs.

```jsx
<Modal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
>
  <Text>Are you sure?</Text>
</Modal>
```

#### [Toast](./components/Toast.md)
Toast component for temporary notifications.

```jsx
<Toast
  message="Save successful"
  type="success"
  duration={3000}
  visible={showToast}
/>
```

#### [Alert](./components/Alert.md)
Alert component for important messages.

```jsx
<Alert
  type="warning"
  title="Warning"
  message="This action cannot be undone"
  actions={[
    { text: "Cancel", onPress: () => {} },
    { text: "Continue", onPress: handleContinue }
  ]}
/>
```

#### [ProgressBar](./components/ProgressBar.md)
Progress indicator component.

```jsx
<ProgressBar
  progress={0.75}
  color="primary"
  showLabel
  animated
/>
```

#### [LoadingSpinner](./components/LoadingSpinner.md)
Loading spinner component.

```jsx
<LoadingSpinner
  size="large"
  color="primary"
  overlay={true}
/>
```

### Form Components

#### [Form](./components/Form.md)
Form wrapper with validation.

```jsx
<Form onSubmit={handleSubmit} validationSchema={schema}>
  <FormField name="email">
    <TextInput placeholder="Email" />
  </FormField>
  <FormField name="password">
    <TextInput placeholder="Password" secureTextEntry />
  </FormField>
  <Button title="Submit" type="submit" />
</Form>
```

#### [FormField](./components/FormField.md)
Form field wrapper with label and error handling.

```jsx
<FormField
  label="Email Address"
  required
  error={emailError}
>
  <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="Enter your email"
  />
</FormField>
```

## Quick Reference

### Common Props

Most components share these common props:

| Prop | Type | Description |
|------|------|-------------|
| `style` | object/array | Custom styles |
| `testID` | string | Test identifier |
| `accessibilityLabel` | string | Accessibility label |
| `theme` | object | Theme overrides |

### Size Values

Standard size values used across components:

- `xs` (extra small)
- `small`
- `medium` (default)
- `large`
- `xl` (extra large)

### Color Values

Standard color values from theme:

- `primary`
- `secondary`
- `success`
- `warning`
- `danger`
- `info`
- `light`
- `dark`

### Spacing Values

Standard spacing values:

- `none` (0)
- `xs` (4px)
- `small` (8px)
- `medium` (16px)
- `large` (24px)
- `xl` (32px)
- `xxl` (48px)

## Theme Configuration

### Default Theme Structure

```javascript
const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    info: '#5AC8FA',
    light: '#F2F2F7',
    dark: '#1C1C1E',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
  },
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    heading1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    heading2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
  },
  shadows: {
    small: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};
```

### Using Themes

```jsx
import { ThemeProvider, useTheme } from '../theme';

// App level
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Component level
function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Themed content
      </Text>
    </View>
  );
}
```

### Dark Mode

```javascript
const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
};
```

## Platform Adaptations

### React Native Specific

```jsx
import { Platform } from 'react-native';

const Button = ({ ...props }) => {
  const platformStyle = Platform.select({
    ios: { shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
  });
  
  return <TouchableOpacity style={[baseStyle, platformStyle]} {...props} />;
};
```

### Flutter Specific

```dart
class CustomButton extends StatelessWidget {
  Widget build(BuildContext context) {
    return Platform.isIOS
        ? CupertinoButton(...)
        : MaterialButton(...);
  }
}
```

## Best Practices

### Component Usage

1. **Consistent API**: Use consistent prop names across components
2. **Composition**: Prefer composition over inheritance
3. **Single Responsibility**: Each component should have one clear purpose
4. **Prop Validation**: Use TypeScript or PropTypes for prop validation

### Performance

1. **Memoization**: Use React.memo for pure components
2. **Lazy Loading**: Implement lazy loading for heavy components
3. **Virtual Lists**: Use virtual lists for large datasets
4. **Image Optimization**: Optimize images and use appropriate formats

### Accessibility

1. **Labels**: Provide meaningful accessibility labels
2. **Roles**: Use appropriate accessibility roles
3. **Focus Management**: Implement proper focus management
4. **High Contrast**: Support high contrast modes

### Testing

1. **Unit Tests**: Test component logic and props
2. **Integration Tests**: Test component interactions
3. **Visual Tests**: Use snapshot testing for visual regressions
4. **Accessibility Tests**: Test with screen readers

## Migration Guide

### From v1 to v2

Major changes in v2:

1. **Theme System**: New theme structure with better TypeScript support
2. **Breaking Changes**: Some prop names have changed for consistency
3. **New Components**: Added Form, Grid, and enhanced accessibility
4. **Performance**: Improved performance with better memoization

See [MIGRATION.md](./MIGRATION.md) for detailed migration instructions.

## Contributing

### Adding New Components

1. Create component in appropriate category folder
2. Add comprehensive documentation
3. Include examples for all platforms
4. Add unit tests and stories
5. Update this index file

### Documentation Standards

1. Include overview and basic usage
2. Document all props with types
3. Provide platform-specific examples
4. Include accessibility considerations
5. Add troubleshooting section

## Support

For questions and support:

- [GitHub Issues](https://github.com/your-org/mobile-components/issues)
- [Documentation](https://your-docs-site.com)
- [Discord Community](https://discord.gg/your-community)

---

Last updated: 2024-01-15