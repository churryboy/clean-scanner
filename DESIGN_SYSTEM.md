# Complete Design System Documentation

## Table of Contents
1. [Icon Design Guidelines](#1-icon-design-guidelines)
2. [Component Naming System](#2-component-naming-system)
3. [Corner Radius System](#3-corner-radius-system)
4. [Grid System & Layouts](#4-grid-system--layouts)
5. [Typography System](#5-typography-system)
6. [Color System](#6-color-system)
7. [Spacing System](#7-spacing-system)
8. [Component Library](#8-component-library)
9. [Implementation Guidelines](#9-implementation-guidelines)
10. [Best Practices](#10-best-practices)
11. [Version Control](#11-version-control)
12. [Quick Reference](#12-quick-reference)

---

## 1. Icon Design Guidelines

### Frame Specifications
- **Base Canvas Size**: 24x24px (default for all icons)
- **Frame Border Radius**: 5px
- **Safe Area**: 2px padding from all edges
- **Active Area**: 20x20px (accounting for safe margins)
- **Guide Frame**: Reference grid for consistent positioning

### Construction Guidelines
- **Stroke Width**: Consistent 1.5px for all icon outlines
- **Design Method**: Vector-based for infinite scalability
- **Processing**: Apply "Flatten Selection" + "Outline Stroke" before export
- **Layer Naming**: All vector layers named as "Vector"
- **Style Preference**: Outlined icons preferred over filled for consistency

### Icon Size Scale
- **Standard Sizes**: 14, 16, 20, 24 (default), 28, 32, 40px
- **Scaling Rule**: Scale in defined increments only
- **Minimum Size**: 14px (smaller sizes may compromise clarity)

### Visual Style Variations
- **Outlined**: Primary style with 1.5px stroke
- **Filled**: Secondary style for emphasis or selected states

---

## 2. Component Naming System

### Naming Structure
```
[Asset Type] + [Asset Name] + [Status] + [Style] + [Size]
```

### Component Elements

#### Prefix (Asset Type)
- Icon
- Button
- Card
- Component
- Widget

#### Core Name
- Descriptive identifier (e.g., Arrow, Chevron, Flash, Thumb)

#### Suffix Options
- **Direction**: Up, Down, Left, Right, Right-left
- **Status**: Active, Disabled, Hover, Focused, Selected
- **Style**: Fill, Outline
- **Size**: Small, Medium, Large, XL

### Naming Examples
```
icon-arrow-up-outline-24
icon-chevron-circle-left-fill-32
icon-flash-on-outline-24
button-primary-hover-large
card-content-active-medium
```

---

## 3. Corner Radius System

### Radius Scale
- **None**: 0px (sharp corners)
- **Small**: 2px (subtle rounding)
- **Medium**: 5px (icon frames, small components)
- **Large**: 8px (cards, containers)
- **XLarge**: 12px (modals, large cards)
- **XXLarge**: 16px (hero sections)
- **Full**: 9999px (pills, circular elements)

### Application Guidelines
- Icons: 5px (consistent with frame specification)
- Buttons: 8px (standard), 9999px (pill buttons)
- Cards: 12px (standard containers)
- Modals: 16px (large overlays)

---

## 4. Grid System & Layouts

### Mobile (360px Frame)
- **Viewport**: 360px minimum
- **Columns**: 4
- **Margin**: 16px
- **Gutter**: 16px
- **Content Width**: 328px (360 - 32px margins)

### Tablet Small (640px - 820px)
- **Min Width**: 640px
- **Max Width**: 1023px
- **Columns**: 8
- **Margin**: 24px
- **Gutter**: 16px

### Tablet Large (820px - 1180px)
- **Min Width**: 1024px
- **Max Width**: 1279px
- **Columns**: 8
- **Margin**: 24px
- **Gutter**: 32px (major sections)

### Desktop/Web (1280px+)
- **Min Width**: 1280px
- **Columns**: 12
- **Margin**: 24px
- **Gutter**: 32px (major sections)

---

## 5. Typography System

### Font Family
**Primary**: Pretendard (프리텐다드)

### Font Weight Scale
- **Regular**: 400
- **Medium**: 500
- **SemiBold**: 600
- **Bold**: 700

### Typography Styles

| Style | Size | Line Height | Weight | Use Case |
|-------|------|-------------|--------|----------|
| **LargeTitle** | 28px | 36px | Bold | Main page titles |
| **Title1** | 24px | 32px | Bold | Section headers |
| **Title2** | 20px | 28px | Bold | Subsection headers |
| **Headline** | 16px | 24px | SemiBold | Component titles |
| **Headline_Strong** | 16px | 24px | Bold | Emphasized titles |
| **Body** | 16px | 24px | Regular | Main content |
| **Body_Strong** | 16px | 24px | SemiBold | Emphasized content |
| **Subheadline** | 14px | 20px | Regular | Secondary content |
| **Subheadline_Strong** | 14px | 20px | SemiBold | Emphasized secondary |
| **Footnote** | 13px | 18px | Regular | Annotations |
| **Footnote_Strong** | 13px | 18px | SemiBold | Important notes |
| **Caption1** | 12px | 16px | Regular | Labels, helper text |
| **Caption1_Strong** | 12px | 16px | SemiBold | Important labels |
| **Caption2** | 11px | 16px | Medium | Smallest text |
| **Caption2_Strong** | 11px | 16px | Bold | Emphasized small text |

---

## 6. Color System

### Color Philosophy
The color palette is designed for clear communication and optimal usability across all devices. Interface colors are used for UI elements, maintaining consistency across the design system. Product-specific colors reinforce brand identity, while semantic colors provide immediate visual feedback about the state or purpose of elements.

### Brand Color
**QANDA Orange**: Primary brand color representing the QANDA identity
- **Orange**: #FF5500

### Interface Colors

#### Orange Scale
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Orange10 | #3A2C24 | - | Darkest shade |
| Orange20 | #6E5344 | - | Dark accent |
| Orange50 | #ED5000 | - | Primary action |
| Orange60 | #FA6616 | - | Hover state |
| Orange90 | #FBDCCC | - | Light tint |
| Orange100 | #FEF1EB | - | Lightest tint |

#### Red Scale (Error/Negative)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Red10 | #372324 | - | Darkest shade |
| Red20 | #6B4446 | - | Dark accent |
| Red50 | #FB2D36 | - | Error primary |
| Red60 | #FA4F57 | - | Error hover |
| Red80 | #FFB6B1 | - | Light error |
| Red90 | #FED5D7 | - | Error background |
| Red100 | #FFEEEF | - | Lightest error |

#### Blue Scale (Interactive)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Blue10 | #202C35 | - | Darkest shade |
| Blue20 | #3F5769 | - | Dark accent |
| Blue50 | #0785F2 | - | Link/Interactive |
| Blue60 | #1198FF | - | Hover state |
| Blue90 | #CDE7FC | - | Light tint |
| Blue100 | #ECF6FF | - | Lightest tint |

#### Green Scale (Success)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Green10 | #20312D | - | Darkest shade |
| Green20 | #41635B | - | Dark accent |
| Green50 | #0D9974 | - | Success primary |
| Green60 | #00A87C | - | Success hover |
| Green90 | #CFEBE3 | - | Light success |
| Green100 | #ECF7F4 | - | Success background |

#### Purple Scale (Informative)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Purple10 | #281F3F | - | Darkest shade |
| Purple20 | #493673 | - | Dark accent |
| Purple50 | #7E53E3 | - | Info primary |
| Purple60 | #9B71FF | - | Info hover |
| Purple90 | #E5DDF9 | - | Light info |
| Purple100 | #F5F0FC | - | Info background |

#### Yellow Scale (Notice/Warning)
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Yellow10 | #322F1B | - | Darkest shade |
| Yellow20 | #656037 | - | Dark accent |
| Yellow50 | #FFCC00 | - | Warning primary |
| Yellow60 | #F0CF29 | - | Warning hover |
| Yellow90 | #FFF5CC | - | Light warning |
| Yellow100 | #FFFBEB | - | Warning background |

### Neutral Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Neutral0 | #121212 | #F9F9F9 | Pure black/white |
| Neutral10 | #222222 | #F9F9F9 | Primary text |
| Neutral20 | #3D3D3D | #D0D0D0 | Secondary elements |
| Neutral30 | #5D5D5D | #B5B5B5 | Tertiary text |
| Neutral40 | #7A7A7A | #999999 | Disabled state |
| Neutral50 | #999999 | #7A7A7A | Mid-tone |
| Neutral60 | #B5B5B5 | #5D5D5D | Light borders |
| Neutral70 | #D0D0D0 | #3D3D3D | Subtle backgrounds |
| Neutral80 | #F0F0F0 | #222222 | Light fills |
| Neutral90 | #F9F9F9 | #121212 | Canvas background |
| Neutral100 | #FFFFFF | #000000 | Pure white/black |

---

## 7. Spacing System

### Overview
Spacing defines the relationship between Sections, Components, and elements. It's applied through Padding for internal spacing and Gap for spacing between elements.

### Base Unit: 8px Grid

| Token | Value | Usage |
|-------|-------|--------|
| **space-xs** | 4px | Tight spacing |
| **space-sm** | 8px | Small gaps |
| **space-md** | 12px | Medium gaps |
| **space-base** | 16px | Standard spacing |
| **space-lg** | 24px | Large gaps |
| **space-xl** | 32px | Section spacing |
| **space-2xl** | 48px | Major sections |
| **space-3xl** | 64px | Page sections |

### Section Padding

#### Small Devices (Mobile)
| Property | Value | Usage |
|----------|-------|--------|
| **Padding X** | 16px | Horizontal padding for sections |
| **Padding Y** | 24px | Vertical padding for sections |

#### Medium-Large Devices (Tablet/Desktop)
| Property | Value | Usage |
|----------|-------|--------|
| **Padding X** | 24px | Horizontal padding for sections |
| **Padding Y** | 32px | Vertical padding for sections |

### Section Gap (Component Spacing)

#### Small Devices
| Property | Value | Usage |
|----------|-------|--------|
| **Gap X** | 16px | Horizontal gap between components |
| **Gap Y** | 24px | Vertical gap between component rows |

#### Medium-Large Devices
| Property | Value | Usage |
|----------|-------|--------|
| **Gap X** | 24px | Horizontal gap between components |
| **Gap Y** | 32px | Vertical gap between component rows |

---

## 8. Component Library

### Badges

Badges are used to highlight important information such as counts, statuses, or updates.

#### Badge Types
1. **NEW Badge**: Indicates new content or features
2. **Digit Badge**: Shows numerical counts or quantities

#### Badge Sizes
| Size | Usage | Visual Scale |
|------|-------|--------------|
| **XSmall** | For updates, alerts next to small UI elements | Dot indicator |
| **Small** | For updates, alerts next to standard UI elements | Small circle |
| **Medium** | For new features, prominent content indicators | Medium circle with "N" |

### Buttons

Buttons are interactive elements that allow users to trigger actions.

#### Button Hierarchy
1. **Primary**: CTA button for the main action (Orange background)
2. **Secondary**: Secondary action with less emphasis (Dark background)
3. **Tertiary**: Same level as Secondary but different visual treatment
4. **Outlined**: Transparent with border for optional actions
5. **Quaternary**: Text-only button for less important actions
6. **Negative**: For destructive or cancellation actions (Red)

#### Button Sizes

**Standard Buttons:**
| Size | Min Width | Max Width | Height | Usage |
|------|-----------|-----------|---------|--------|
| **Large** | 200px | 400px | 56px | Primary CTA buttons |
| **Medium** | 144px | 340px | 48px | Standard buttons, CTAs |
| **Small** | 80px | 200px | 40px | Secondary actions |
| **XSmall** | 28px | 160px | 32px | Inline actions |

#### Button States
- **Enabled**: Default interactive state
- **Disabled**: Non-interactive, visually muted
- **Pressed**: Active touch/click feedback
- **Hovered**: Mouse hover indication
- **Loading**: Processing state with spinner

### Controls

Controls are components that allow users to select options.

#### Checkbox
For multiple independent selections.

**Sizes:**
| Size | Height | Width | Usage |
|------|--------|-------|--------|
| **Medium** | 40px | 40px | Standard forms and settings |
| **Small** | 36px | 36px | Compact lists and inline options |

#### Radio Button
For single selection from mutually exclusive options.

**Sizes:**
| Size | Height | Width | Usage |
|------|--------|-------|--------|
| **Medium** | 40px | 40px | Standard forms and selections |
| **Small** | 36px | 36px | Compact lists and filters |

#### Toggle Switch
For binary on/off selections with immediate effect.

**Sizes:**
| Size | Height | Width | Label Style | Usage |
|------|--------|-------|-------------|--------|
| **Large** | 32px | 52px | Body | Major settings |
| **Medium** | 24px | 40px | Body | Standard settings |
| **Small** | 20px | 32px | Subheadline | Inline settings |

### Divider

Dividers separate content into distinct sections.

#### Weight Options
| Weight | Thickness | Usage |
|--------|-----------|--------|
| **Thin** | 1px | Subtle separation within related content |
| **Regular** | 4px | Standard separation between sections |
| **Thick** | 12px | Strong visual break between major sections |

---

## 9. Implementation Guidelines

### Design Tokens
```css
/* Example CSS Variables */
:root {
  /* Icon */
  --icon-size-default: 24px;
  --icon-stroke-width: 1.5px;
  --radius-icon: 5px;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Typography */
  --font-primary: 'Pretendard', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Colors - Brand */
  --color-brand-orange: #FF5500;
  
  /* Colors - Orange Scale */
  --color-orange-10: #3A2C24;
  --color-orange-20: #6E5344;
  --color-orange-50: #ED5000;
  --color-orange-60: #FA6616;
  --color-orange-90: #FBDCCC;
  --color-orange-100: #FEF1EB;
  
  /* Colors - Red Scale */
  --color-red-10: #372324;
  --color-red-20: #6B4446;
  --color-red-50: #FB2D36;
  --color-red-60: #FA4F57;
  --color-red-80: #FFB6B1;
  --color-red-90: #FED5D7;
  --color-red-100: #FFEEEF;
  
  /* Colors - Blue Scale */
  --color-blue-10: #202C35;
  --color-blue-20: #3F5769;
  --color-blue-50: #0785F2;
  --color-blue-60: #1198FF;
  --color-blue-90: #CDE7FC;
  --color-blue-100: #ECF6FF;
  
  /* Colors - Green Scale */
  --color-green-10: #20312D;
  --color-green-20: #41635B;
  --color-green-50: #0D9974;
  --color-green-60: #00A87C;
  --color-green-90: #CFEBE3;
  --color-green-100: #ECF7F4;
  
  /* Colors - Purple Scale */
  --color-purple-10: #281F3F;
  --color-purple-20: #493673;
  --color-purple-50: #7E53E3;
  --color-purple-60: #9B71FF;
  --color-purple-90: #E5DDF9;
  --color-purple-100: #F5F0FC;
  
  /* Colors - Yellow Scale */
  --color-yellow-10: #322F1B;
  --color-yellow-20: #656037;
  --color-yellow-50: #FFCC00;
  --color-yellow-60: #F0CF29;
  --color-yellow-90: #FFF5CC;
  --color-yellow-100: #FFFBEB;
  
  /* Colors - Neutral Scale */
  --color-neutral-0: #121212;
  --color-neutral-10: #222222;
  --color-neutral-20: #3D3D3D;
  --color-neutral-30: #5D5D5D;
  --color-neutral-40: #7A7A7A;
  --color-neutral-50: #999999;
  --color-neutral-60: #B5B5B5;
  --color-neutral-70: #D0D0D0;
  --color-neutral-80: #F0F0F0;
  --color-neutral-90: #F9F9F9;
  --color-neutral-100: #FFFFFF;
  
  /* Corner Radius */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 5px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
  
  /* Buttons */
  --btn-height-large: 56px;
  --btn-height-medium: 48px;
  --btn-height-small: 40px;
  --btn-height-xsmall: 32px;
  --btn-radius: 8px;
  
  /* Typography Styles */
  --type-large-title: 28px;
  --type-title1: 24px;
  --type-title2: 20px;
  --type-headline: 16px;
  --type-body: 16px;
  --type-subheadline: 14px;
  --type-footnote: 13px;
  --type-caption1: 12px;
  --type-caption2: 11px;
}
```

### File Structure
```
/design-system
  /icons
    /24px
      /outline
      /filled
    /source
  /components
    /buttons
    /controls
    /badges
  /documentation
    guidelines.md
    changelog.md
```

### Export Formats
- **SVG**: Primary format for web (scalable)
- **PNG**: @1x, @2x, @3x for various densities
- **PDF**: Vector format for iOS

---

## 10. Best Practices

### Design Principles
1. **Consistency**: Uniform application across all platforms
2. **Clarity**: Instantly recognizable at all sizes
3. **Simplicity**: Geometric, clean forms
4. **Scalability**: Vector-based, resolution independent
5. **Accessibility**: Inclusive design for all users

### Quality Checklist
- [ ] Icons aligned to pixel grid
- [ ] 1.5px stroke width consistent
- [ ] 2px safe area maintained
- [ ] Proper naming convention applied
- [ ] All required sizes exported
- [ ] Vector sources preserved
- [ ] Accessibility standards met
- [ ] Color contrast ratios verified
- [ ] Touch targets adequate (min 44x44px)

### Common Pitfalls to Avoid
- Inconsistent stroke widths
- Misaligned pixels (blurry rendering)
- Overly complex icon designs
- Insufficient contrast ratios
- Missing accessibility attributes
- Inconsistent naming patterns
- Mixed control types for same selection type

### Accessibility Guidelines
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Focus States**: Clear visual indication for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Motion**: Respect prefers-reduced-motion settings

---

## 11. Version Control

### Versioning Strategy
- **Major**: Breaking changes (v1.0.0 → v2.0.0)
- **Minor**: New features (v1.0.0 → v1.1.0)
- **Patch**: Bug fixes (v1.0.0 → v1.0.1)

### Change Documentation
- Maintain detailed changelog
- Document breaking changes
- Provide migration guides
- Archive deprecated assets

### Changelog Template
```markdown
## [Version] - YYYY-MM-DD

### Added
- New features or components

### Changed
- Updates to existing functionality

### Deprecated
- Features marked for removal

### Removed
- Deleted features or assets

### Fixed
- Bug fixes and corrections

### Security
- Security-related updates
```

---

## 12. Quick Reference

### Icon Specifications
- Size: 24x24px
- Stroke: 1.5px
- Radius: 5px
- Padding: 2px

### Grid Breakpoints
- Mobile: 360px (4 columns)
- Tablet Small: 640px-1023px (8 columns)
- Tablet Large: 1024px-1279px (8 columns)
- Desktop: 1280px+ (12 columns)

### Typography Scale
- Display: 28px
- Title: 24px, 20px
- Body: 16px
- Caption: 12px, 11px

### Spacing Scale
- 4, 8, 12, 16, 24, 32, 48, 64px

### Button Heights
- Large: 56px
- Medium: 48px
- Small: 40px
- XSmall: 32px

### Control Sizes
- Checkbox: 40px (M), 36px (S)
- Radio: 40px (M), 36px (S)
- Toggle: 52×32px (L), 40×24px (M), 32×20px (S)

### Corner Radius Quick Reference
| Element | Radius |
|---------|--------|
| Icons | 5px |
| Buttons | 8px |
| Cards | 12px |
| Modals | 16px |
| Pills | 9999px |

### Color Tokens Quick Reference
| Purpose | Token | Hex |
|---------|-------|-----|
| Primary Brand | Orange | #FF5500 |
| Primary Action | Orange50 | #ED5000 |
| Error | Red50 | #FB2D36 |
| Success | Green50 | #0D9974 |
| Info | Purple50 | #7E53E3 |
| Warning | Yellow50 | #FFCC00 |
| Interactive | Blue50 | #0785F2 |

---

**Version**: 4.0 (Complete)  
**Last Updated**: December 2024  
**Maintained By**: Design System Team  
**Contact**: design-system@company.com

---

## License & Usage

This design system documentation is proprietary to QANDA. All rights reserved. For usage permissions and licensing information, please contact the Design System Team.

---

## Additional Resources

### Tools & Libraries
- **Figma**: Primary design tool
- **Design Tokens**: CSS variables and JSON exports
- **Component Library**: React/Vue/Web Components

### Learning Resources
- Design System Handbook
- Component Usage Examples
- Accessibility Guidelines
- Code Snippets Repository

### Support
For questions, suggestions, or contributions:
- Slack: #design-system
- Email: design-system@company.com
- Documentation: [Internal Wiki Link]

---

*This design system is a living document and will evolve based on product needs and user feedback. Stay updated with the latest changes through our changelog and communication channels.*

