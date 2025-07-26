# Button Component

## Overview

The `Button` component is a versatile, customizable button that supports multiple variants, sizes, states, and accessibility features. It's designed to work across React Native, Flutter, and native iOS/Android platforms.

## Basic Usage

### React Native / React

```jsx
import { Button } from '../components/Button';

// Simple button
<Button title="Click Me" onPress={() => console.log('Clicked!')} />

// Primary button with loading state
<Button
  title="Save"
  onPress={handleSave}
  variant="primary"
  loading={isSaving}
/>

// Disabled button
<Button
  title="Submit"
  onPress={handleSubmit}
  disabled={!isFormValid}
/>
```

### Flutter (Dart)

```dart
import 'package:myapp/components/button.dart';

// Simple button
Button(
  title: "Click Me",
  onPressed: () => print("Clicked!"),
)

// Primary button with loading state
Button(
  title: "Save",
  onPressed: handleSave,
  variant: ButtonVariant.primary,
  loading: isSaving,
)

// Disabled button
Button(
  title: "Submit",
  onPressed: handleSubmit,
  disabled: !isFormValid,
)
```

### iOS (Swift)

```swift
import UIKit

// Create and configure button
let button = CustomButton()
button.setTitle("Click Me", for: .normal)
button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
button.variant = .primary
button.size = .large
```

### Android (Kotlin)

```kotlin
// In layout XML
<com.myapp.components.CustomButton
    android:id="@+id/button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:title="Click Me"
    app:variant="primary"
    app:size="large" />

// In Activity/Fragment
val button = findViewById<CustomButton>(R.id.button)
button.setOnClickListener { /* handle click */ }
```

## Props/Parameters

### Universal Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | Yes | - | Text displayed on the button |
| `onPress/onPressed/onClick` | function | Yes | - | Callback when button is pressed |
| `variant` | string/enum | No | 'primary' | Button style variant |
| `size` | string/enum | No | 'medium' | Button size |
| `disabled` | boolean | No | false | Whether button is disabled |
| `loading` | boolean | No | false | Whether button shows loading state |
| `icon` | string/component | No | - | Icon to display (name or component) |
| `iconPosition` | string | No | 'left' | Position of icon ('left', 'right') |
| `fullWidth` | boolean | No | false | Whether button takes full width |
| `accessibilityLabel` | string | No | title | Accessibility label for screen readers |

### Platform-Specific Props

#### React Native Additional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeOpacity` | number | 0.7 | Opacity when pressed |
| `hitSlop` | object | - | Extends touchable area |
| `testID` | string | - | Test identifier |

#### Flutter Additional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heroTag` | string | - | Unique tag for hero animations |
| `tooltip` | string | - | Tooltip text |
| `focusNode` | FocusNode | - | Focus node for keyboard navigation |

## Variants

### Primary
- High emphasis button for main actions
- Uses app's primary color
- White text on colored background

```jsx
<Button title="Save Changes" variant="primary" onPress={handleSave} />
```

### Secondary
- Medium emphasis button for secondary actions
- Uses app's secondary color or outline style

```jsx
<Button title="Cancel" variant="secondary" onPress={handleCancel} />
```

### Outline
- Low emphasis button with border
- Transparent background with colored border and text

```jsx
<Button title="Learn More" variant="outline" onPress={showInfo} />
```

### Text
- Minimal emphasis button
- No background, just colored text

```jsx
<Button title="Skip" variant="text" onPress={handleSkip} />
```

### Danger
- For destructive actions
- Red color scheme

```jsx
<Button title="Delete" variant="danger" onPress={handleDelete} />
```

## Sizes

### Small
- Compact button for dense layouts
- Height: 32px, Padding: 8px 12px

```jsx
<Button title="Edit" size="small" onPress={handleEdit} />
```

### Medium (Default)
- Standard button size
- Height: 40px, Padding: 12px 16px

```jsx
<Button title="Submit" size="medium" onPress={handleSubmit} />
```

### Large
- Prominent button for important actions
- Height: 48px, Padding: 16px 24px

```jsx
<Button title="Get Started" size="large" onPress={handleStart} />
```

## States

### Loading State

When `loading` is true, the button shows a spinner and becomes non-interactive:

```jsx
const [isLoading, setIsLoading] = useState(false);

const handleAsyncAction = async () => {
  setIsLoading(true);
  try {
    await performAsyncOperation();
  } finally {
    setIsLoading(false);
  }
};

<Button
  title="Submit"
  onPress={handleAsyncAction}
  loading={isLoading}
/>
```

### Disabled State

When `disabled` is true, the button appears grayed out and is non-interactive:

```jsx
const [isFormValid, setIsFormValid] = useState(false);

<Button
  title="Submit Form"
  onPress={handleSubmit}
  disabled={!isFormValid}
/>
```

## Icons

### With Icon

```jsx
// Icon on the left (default)
<Button
  title="Save"
  icon="save"
  onPress={handleSave}
/>

// Icon on the right
<Button
  title="Next"
  icon="arrow-right"
  iconPosition="right"
  onPress={handleNext}
/>

// Icon only (no title)
<Button
  icon="heart"
  onPress={handleLike}
  accessibilityLabel="Like this post"
/>
```

### Custom Icon Component

```jsx
// React Native with custom icon component
<Button
  title="Share"
  icon={<ShareIcon size={16} color="white" />}
  onPress={handleShare}
/>
```

## Accessibility

The Button component includes comprehensive accessibility support:

```jsx
<Button
  title="Delete Item"
  onPress={handleDelete}
  accessibilityLabel="Delete this item permanently"
  accessibilityHint="This action cannot be undone"
  accessibilityRole="button"
/>
```

### Screen Reader Support

- Automatically announces button text
- Indicates when button is disabled
- Announces loading state changes
- Supports custom accessibility labels

### Keyboard Navigation

- Focusable with Tab key
- Activatable with Enter/Space
- Visual focus indicators
- Proper tab order

## Styling and Theming

### Custom Styles

```jsx
// React Native with custom styles
<Button
  title="Custom Button"
  onPress={handlePress}
  style={{
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
  }}
  textStyle={{
    fontSize: 16,
    fontWeight: '600',
  }}
/>
```

### Theme Integration

```jsx
// Using theme provider
const theme = useTheme();

<Button
  title="Themed Button"
  onPress={handlePress}
  variant="primary"
  // Theme colors automatically applied
/>
```

### Dark Mode Support

The Button automatically adapts to dark mode:

```jsx
// Automatically uses appropriate colors for dark/light mode
<Button title="Auto Theme" onPress={handlePress} />
```

## Advanced Examples

### Confirmation Button with Modal

```jsx
const ConfirmButton = ({ title, onConfirm, confirmMessage }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => setShowModal(true);
  
  const handleConfirm = () => {
    setShowModal(false);
    onConfirm();
  };

  return (
    <>
      <Button
        title={title}
        onPress={handlePress}
        variant="danger"
      />
      
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Action"
      >
        <Text>{confirmMessage}</Text>
        <View style={styles.modalButtons}>
          <Button
            title="Cancel"
            onPress={() => setShowModal(false)}
            variant="secondary"
          />
          <Button
            title="Confirm"
            onPress={handleConfirm}
            variant="danger"
          />
        </View>
      </Modal>
    </>
  );
};

// Usage
<ConfirmButton
  title="Delete Account"
  onConfirm={handleDeleteAccount}
  confirmMessage="Are you sure you want to delete your account? This action cannot be undone."
/>
```

### Button with Haptic Feedback

```jsx
import { Haptics } from 'expo-haptics';

const HapticButton = ({ onPress, ...props }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return <Button {...props} onPress={handlePress} />;
};
```

### Animated Button

```jsx
import { Animated } from 'react-native';

const AnimatedButton = ({ onPress, ...props }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Button
        {...props}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      />
    </Animated.View>
  );
};
```

## Testing

### Unit Tests

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={() => {}} loading />
    );
    
    expect(getByTestId('button-loading-spinner')).toBeTruthy();
  });
});
```

### E2E Tests

```javascript
// Using Detox for React Native E2E testing
describe('Button E2E', () => {
  it('should navigate when button is pressed', async () => {
    await element(by.id('login-button')).tap();
    await expect(element(by.id('dashboard-screen'))).toBeVisible();
  });

  it('should show loading state during async operation', async () => {
    await element(by.id('submit-button')).tap();
    await expect(element(by.id('loading-spinner'))).toBeVisible();
    await waitFor(element(by.id('success-message'))).toBeVisible().withTimeout(5000);
  });
});
```

## Performance Considerations

### Optimization Tips

1. **Memoization**: Use `React.memo` for buttons that don't change frequently
2. **Debouncing**: Prevent rapid successive presses
3. **Image Optimization**: Optimize icon assets
4. **Native Driver**: Use native animations where possible

```jsx
import { useMemo, useCallback } from 'react';

const OptimizedButton = React.memo(({ title, onPress, ...props }) => {
  const handlePress = useCallback(() => {
    // Debounce rapid clicks
    if (Date.now() - lastPressTime < 500) return;
    lastPressTime = Date.now();
    onPress();
  }, [onPress]);

  const buttonStyles = useMemo(() => ({
    // Compute styles once
    ...getButtonStyles(props.variant, props.size),
    ...props.style,
  }), [props.variant, props.size, props.style]);

  return (
    <Button
      {...props}
      onPress={handlePress}
      style={buttonStyles}
    />
  );
});
```

## Common Patterns

### Button Groups

```jsx
const ButtonGroup = ({ buttons, selectedIndex, onSelect }) => (
  <View style={styles.buttonGroup}>
    {buttons.map((button, index) => (
      <Button
        key={index}
        title={button.title}
        onPress={() => onSelect(index)}
        variant={selectedIndex === index ? 'primary' : 'outline'}
        style={[
          styles.groupButton,
          index === 0 && styles.firstButton,
          index === buttons.length - 1 && styles.lastButton,
        ]}
      />
    ))}
  </View>
);
```

### Floating Action Button

```jsx
const FloatingActionButton = ({ onPress, icon = 'plus' }) => (
  <Button
    icon={icon}
    onPress={onPress}
    size="large"
    variant="primary"
    style={styles.fab}
    accessibilityLabel="Add new item"
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
```

## Troubleshooting

### Common Issues

1. **Button not responding**: Check if `disabled` or `loading` props are set
2. **Styling not applied**: Ensure style objects are properly structured
3. **Accessibility warnings**: Add proper `accessibilityLabel` for icon-only buttons
4. **Performance issues**: Consider memoization for frequently re-rendered buttons

### Debug Mode

```jsx
const DebugButton = ({ debug, ...props }) => {
  if (debug) {
    console.log('Button props:', props);
  }
  
  return <Button {...props} />;
};
```

---

For more component documentation, see the [Component Library Overview](../COMPONENT_LIBRARY.md).