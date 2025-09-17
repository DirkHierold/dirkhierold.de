<system_context>
Dirk Hierold's personal website built with Astro, TailwindCSS, and React. This is a blog-focused static site featuring technical content, with emphasis on maintaining current dependencies and proper deployment workflows. Content management includes both markdown blog posts and dynamic components.
</system_context>

<critical_notes>
## MISSION CRITICAL RULES

1. **ALWAYS USE LATEST DEPENDENCIES** - **NEVER DOWNGRADE DEPENDENCIES**. Always use the latest stable versions and proper tooling to check versions. Never guess or assume versions.

2. **USE GSED INSTEAD OF SED** - **ALWAYS USE `gsed` INSTEAD OF `sed`** for better compatibility across platforms. `gsed` provides GNU sed features that are more consistent across Linux and macOS.

3. **Development Server Limitation** - **DO NOT run `npm run dev`** in agent mode - this creates endless loops and stops the agent from working properly. Use `npm run build` to verify changes instead.

4. **Pull Request Workflow** - Before merging pull requests, show the actual state of the website locally and open it in the browser. Always demonstrate changes before merging.
</critical_notes>

<paved_path>
## ARCHITECTURE (PAVED PATH)

### Dependency Management Workflow
```bash
# Check all outdated dependencies (MANDATORY before updates)
npm outdated

# Check latest version of specific package (MANDATORY for accuracy)
npm view astro version
npm view react version

# Update all dependencies to latest (PREFERRED approach)
npm update --latest
```

### Pull Request Workflow
1. **Show Changes** - Demonstrate website state locally in browser
2. **User Approval** - Get explicit approval from user after demonstration  
3. **Merge** - Only merge after approval received
4. **Provide PR URL** - Always provide PR URL for review

### Build Verification Process
```bash
# Build verification (PREFERRED over npm run dev in agent mode)
npm run build

# Preview build only when specifically requested
npm run preview
```
</paved_path>

<file_map>
## FILE MAP
- `/src/content/blog/` - All blog posts in markdown format with frontmatter
- `/src/pages/` - Page templates and routing configuration
- `/src/components/` - Reusable UI components (React-based)
- `/src/layouts/` - Page layouts and templates
- `/src/styles/` - CSS styles including Tailwind customizations
- `/src/consts.ts` - Global site constants and configuration
- `/public/assets/img/` - Blog post images organized by year/post structure
- `/temp-repos/steipete.com/assets/img/` - Original image source location
</file_map>

<patterns>
## DEVELOPMENT PATTERNS

### Blog Post Creation Pattern
```markdown
---
title: "Post Title"
description: "Post description"
pubDate: "YYYY-MM-DDTHH:MM:SS+HH:MM"
tags: ["tag1", "tag2"]
---

Content here...
```

### Image Fix Pattern
```bash
# Locate original images
find /temp-repos/steipete.com/assets/img/ -name "IMAGE.jpg"

# Copy to public directory (maintain structure)
cp /temp-repos/steipete.com/assets/img/YEAR/POST-NAME/IMAGE.jpg /public/assets/img/YEAR/POST-NAME/

# Commit fixed images
git add public/assets/img/
git commit -m "fix: add missing blog post images"
```

### Dependency Update Pattern
```bash
# Standard dependency update workflow
npm outdated                    # Check what needs updating
npm view astro version         # Verify latest versions
npm update --latest            # Update to latest stable
npm run build                  # Test build after updates
# If build fails: diagnose and fix, NEVER downgrade
```

### Site Configuration Pattern
```typescript
// src/consts.ts - Global site constants
export const SITE_TITLE = 'Site Title';
export const SITE_DESCRIPTION = 'Site description';
```

### Styling Pattern
```css
/* /src/styles/ - Global styling */
/* Use Tailwind classes in components for component-specific styling */
```
</patterns>

<critical_notes>
## TECH STACK

### Current Versions
- **Astro** (latest version) - Main framework
- **TailwindCSS** - For styling  
- **React** (v18.2.0) - For interactive components
- **MDX** - For enhanced markdown support

### Common Tasks Reference
1. **Blog Posts**: Create in `/src/content/blog/` with proper frontmatter and ISO-8601 dates
2. **Site Config**: Modify `/src/consts.ts` for global constants
3. **Styling**: Edit `/src/styles/` for global, use Tailwind classes for components
4. **Layouts**: Modify `/src/layouts/` files for layout changes
5. **Images**: Copy from `/temp-repos/steipete.com/assets/img/` to `/public/assets/img/` maintaining structure
6. **Dependencies**: Always check with tooling, update to latest, test thoroughly, fix issues (never downgrade)

### Image Path Convention
- Pattern: `/assets/img/YEAR/POST-NAME/IMAGE.jpg`
- Source: `/temp-repos/steipete.com/assets/img/`
- Destination: `/public/assets/img/`
</critical_notes>
