# Design System Quick Reference Card

**QANDA Design System v4.0** | Commit: 829fcf5

---

## 🎨 Colors

### Brand
```
QANDA Orange: #FF5500
```

### Primary Actions
```
Orange50:  #ED5000 (Primary Button)
Orange60:  #FA6616 (Hover)
Orange90:  #FBDCCC (Light)
Orange100: #FEF1EB (Background)
```

### Semantic
```
✅ Success:  #0D9974 (Green50)
❌ Error:    #FB2D36 (Red50)
ℹ️  Info:     #0785F2 (Blue50)
⚠️  Warning:  #FFCC00 (Yellow50)
```

### Neutrals
```
Text Primary:    #222222 (Neutral10)
Text Secondary:  #5D5D5D (Neutral30)
Text Disabled:   #7A7A7A (Neutral40)
Border:          #D0D0D0 (Neutral70)
Background:      #F9F9F9 (Neutral90)
White:           #FFFFFF (Neutral100)
```

---

## 📝 Typography

### Font Family
```
Pretendard (프리텐다드)
```

### Scale
```
LargeTitle    28px / 36px / Bold (700)
Title1        24px / 32px / Bold (700)
Title2        20px / 28px / Bold (700)
Headline      16px / 24px / SemiBold (600)
Body          16px / 24px / Regular (400)
Subheadline   14px / 20px / Regular (400)
Footnote      13px / 18px / Regular (400)
Caption1      12px / 16px / Regular (400)
Caption2      11px / 16px / Medium (500)
```

---

## 📏 Spacing (8px Grid)

```
4px   (space-xs)    Tight spacing
8px   (space-sm)    Small gaps
12px  (space-md)    Medium gaps
16px  (space-base)  Standard spacing ⭐
24px  (space-lg)    Large gaps ⭐
32px  (space-xl)    Section spacing
48px  (space-2xl)   Major sections
64px  (space-3xl)   Page sections
```

---

## 🔲 Corner Radius

```
0px     (none)      Sharp corners
2px     (sm)        Subtle
5px     (md)        Icons, small components
8px     (lg)        Buttons, inputs ⭐
12px    (xl)        Cards ⭐
16px    (2xl)       Modals
9999px  (full)      Circular/Pills
```

---

## 🔘 Buttons

### Sizes
```
Large:   56px height (Desktop)
Medium:  48px height (Mobile/Tablet) ⭐
Small:   40px height
XSmall:  32px height
```

### Primary Button
```css
background: #ED5000
color: #FFFFFF
radius: 8px
padding: 0 24px
font-size: 16px
font-weight: 600

hover: #FA6616 + shadow + translateY(-2px)
```

---

## 📱 Breakpoints

```
Mobile:        0px - 639px     (4 columns, 16px margin)
Tablet Small:  640px - 1023px  (8 columns, 24px margin)
Tablet Large:  1024px - 1279px (8 columns, 24px margin)
Desktop:       1280px+          (12 columns, 24px margin)
```

---

## 🔍 Input Fields

```
Height:      48px
Padding:     0 16px
Border:      2px solid #D0D0D0
Radius:      8px
Font Size:   16px
Font Weight: 400

Focus: #ED5000 border + #FEF1EB shadow (3px)
```

---

## ✅ Accessibility

### Color Contrast
```
Normal Text:  4.5:1 minimum
Large Text:   3:1 minimum
UI Elements:  3:1 minimum
```

### Touch Targets
```
Minimum: 44x44px
```

### Focus States
```
Outline: 2px solid #ED5000
Offset: 2px
```

---

## 🧩 Component Specs

### Card Container
```
radius: 12px
padding: 32px (mobile), 48px (desktop)
background: #FFFFFF
shadow: 0 20px 60px rgba(0,0,0,0.15)
```

### Message Alerts
```
padding: 16px
radius: 8px
font-size: 14px
border: 2px solid

Success: Green100 bg + Green10 text
Error:   Red100 bg + Red10 text
Info:    Blue100 bg + Blue10 text
Warning: Yellow100 bg + Yellow10 text
```

### Upload Area
```
border: 2px dashed #B5B5B5
radius: 8px
padding: 48px 24px
background: #F9F9F9

hover: #ED5000 border + #FEF1EB bg
```

---

## 📦 CSS Variables

```css
/* Most Used */
--color-orange-50: #ED5000;
--color-neutral-10: #222222;
--color-neutral-100: #FFFFFF;
--space-base: 16px;
--space-lg: 24px;
--radius-lg: 8px;
--radius-xl: 12px;
--type-body: 16px;
--font-weight-semibold: 600;
--btn-height-medium: 48px;
```

---

## 🚀 Quick Start

### 1. Load Font
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
```

### 2. Apply Base Styles
```css
body {
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #222222;
}
```

### 3. Use Design Tokens
```css
.button {
  background: var(--color-orange-50);
  padding: 0 var(--space-lg);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
}
```

---

## ⚡ Common Patterns

### Primary Button
```css
height: var(--btn-height-medium);
background: var(--color-orange-50);
color: var(--color-neutral-100);
border-radius: var(--radius-lg);
padding: 0 var(--space-lg);
font-size: var(--type-body);
font-weight: var(--font-weight-semibold);
```

### Form Input
```css
height: 48px;
padding: 0 var(--space-base);
border: 2px solid var(--color-neutral-70);
border-radius: var(--radius-lg);
font-size: var(--type-body);
```

### Container Card
```css
background: var(--color-neutral-100);
border-radius: var(--radius-xl);
padding: var(--space-2xl);
box-shadow: 0 20px 60px rgba(0,0,0,0.15);
```

### Success Message
```css
background: var(--color-green-100);
color: var(--color-green-10);
border: 2px solid var(--color-green-90);
padding: var(--space-base);
border-radius: var(--radius-lg);
```

---

## 📋 Checklist for New Components

- [ ] Uses design tokens (CSS variables)
- [ ] Follows 8px spacing grid
- [ ] Uses correct typography scale
- [ ] Applies semantic colors
- [ ] Has proper corner radius
- [ ] Includes hover/focus states
- [ ] WCAG AA color contrast
- [ ] Keyboard accessible
- [ ] Responsive across breakpoints
- [ ] ARIA labels present

---

**Version**: 4.0  
**Updated**: October 24, 2025  
**Commit**: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983

For complete documentation: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

