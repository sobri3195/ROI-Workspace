# Contributing to ROI-Workspace

Thank you for your interest in contributing to ROI-Workspace! This document provides guidelines for contributing to this project.

## 🎯 Project Purpose

ROI-Workspace is a **portfolio/demo application** for radiation oncology specialists. While contributions are welcome, please note that this is primarily an educational and demonstration project, not a production clinical tool.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of React, JavaScript, and CSS

### Setup Development Environment

1. **Fork the repository** (if contributing via GitHub)

2. **Clone your fork**:
```bash
git clone <your-fork-url>
cd roi-workspace
```

3. **Install dependencies**:
```bash
npm install
```

4. **Start development server**:
```bash
npm run dev
```

5. **Open browser**:
Navigate to http://localhost:5173

## 📝 Development Guidelines

### Code Style

#### JavaScript/React
- Use **functional components** with hooks (no class components)
- Use **arrow functions** for component definition
- Use **destructuring** for props and state
- Keep components **small and focused** (single responsibility)
- Use **meaningful variable names** (no single letters except in loops)
- Add **comments** only for complex logic

Example:
```javascript
function MyComponent({ title, data }) {
  const [state, setState] = useState(initialValue)
  
  const handleClick = () => {
    // Handle click logic
  }
  
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  )
}
```

#### CSS
- Use **BEM-like naming** convention
- Prefix classes with component name
- Use **CSS variables** for colors (defined in index.css)
- Keep selectors **specific** to avoid conflicts
- Avoid inline styles (use classes instead)

Example:
```css
.my-component {
  background-color: var(--bg-secondary);
  border-radius: 8px;
}

.my-component-title {
  font-size: 18px;
  color: var(--text-primary);
}
```

#### File Organization
- Components: `src/components/ComponentName.jsx` + `.css`
- Pages: `src/pages/PageName.jsx` + `.css`
- Utils: `src/utils/utilName.js`
- One component per file
- Co-locate CSS with component

### Git Workflow

1. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**:
- Write clean, readable code
- Follow existing patterns
- Test your changes thoroughly

3. **Commit your changes**:
```bash
git add .
git commit -m "feat: add your feature description"
```

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

4. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

5. **Create a Pull Request**

## 🐛 Reporting Bugs

### Before Reporting
- Check if the issue already exists
- Try to reproduce on latest version
- Check browser console for errors

### Bug Report Should Include
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable

## 💡 Suggesting Features

### Feature Request Should Include
- **Use Case**: Why is this feature needed?
- **Description**: What should it do?
- **Examples**: How would it work?
- **Mockups**: Visual examples if applicable

### Good Feature Ideas
- Improved UX/UI enhancements
- New clinical calculations
- Data visualization features
- Export/import functionality
- Accessibility improvements

### Out of Scope
- Real AI integration (this is a demo)
- Backend/database integration
- User authentication
- Real patient data handling

## 🧪 Testing

### Manual Testing Checklist
Before submitting a PR, test:
- [ ] Feature works as intended
- [ ] No console errors
- [ ] Responsive design works
- [ ] Data persists in localStorage
- [ ] Forms validate correctly
- [ ] Navigation works properly
- [ ] Build completes successfully (`npm run build`)

### Browser Testing
Test in at least:
- Chrome (latest)
- Firefox (latest)
- One mobile browser

## 📚 Documentation

When adding new features:
1. Update README.md if needed
2. Add to FEATURES.md if significant
3. Include JSDoc comments for complex functions
4. Update this CONTRIBUTING.md if process changes

## 🎨 Design Principles

### UI/UX Guidelines
- **Consistency**: Follow existing design patterns
- **Clarity**: Labels and instructions should be clear
- **Feedback**: Provide visual feedback for actions
- **Accessibility**: Use semantic HTML and proper labels
- **Dark Theme**: Maintain the medical/clinical aesthetic

### Color Usage
- **Cyan/Teal**: Primary actions, accents, links
- **Green**: Success, low risk, Grade 1
- **Orange**: Warnings, intermediate risk, Grade 2
- **Red**: Danger, high risk, Grade 3, errors
- **Navy/Slate**: Backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable size (14px+)
- **Labels**: 13px, medium weight
- **Small Text**: 12px minimum

## 🚫 What NOT to Do

❌ Add real AI/ML models (keep it demo/mock)  
❌ Introduce backend dependencies  
❌ Add authentication systems  
❌ Use real patient data  
❌ Break existing localStorage structure  
❌ Add large dependencies (keep bundle small)  
❌ Remove demo/disclaimer notices  
❌ Change the dark theme to light  

## ✅ Good Contribution Ideas

✅ UI/UX improvements  
✅ Bug fixes  
✅ Documentation improvements  
✅ New mock features  
✅ Accessibility enhancements  
✅ Performance optimizations  
✅ Responsive design improvements  
✅ New clinical concepts (mock)  
✅ Better error handling  
✅ Code refactoring  

## 📦 Adding Dependencies

Before adding a new npm package:
1. Check if it can be done with vanilla JS/CSS
2. Consider bundle size impact
3. Verify license compatibility
4. Justify the addition

**Prefer**: Pure JS/CSS solutions  
**Avoid**: Heavy libraries, frameworks, UI libraries

## 🔄 Review Process

Pull requests will be reviewed for:
- **Code Quality**: Clean, readable, maintainable
- **Consistency**: Follows project patterns
- **Functionality**: Works as intended
- **Testing**: Manually tested
- **Documentation**: Updated if needed
- **Bundle Size**: No significant increase

## 📞 Getting Help

- **Issues**: Create a GitHub issue
- **Questions**: Use issue with "question" label
- **Discussions**: GitHub Discussions (if enabled)

## 🙏 Thank You!

Your contributions help make this project better for everyone. Whether it's a bug fix, feature, or documentation improvement, every contribution is valued!

---

**Remember**: This is a demo/portfolio project. Keep contributions aligned with its educational and demonstrative purpose. Have fun coding! 🎉
