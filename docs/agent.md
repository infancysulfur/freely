# AGENTS.md
## 0. rule.
terminal에서의 모든 답변은 한국인이 알아들을 수 있게 한국어로 작성한다. 


## 1. Project Overview

### Project Name

Freely

### Description

Freely is a personal finance web service designed to help users understand,
calculate, and manage their personal finances.

The primary goal is to provide simple, intuitive, and trustworthy financial
tools that users can access without financial expertise.

The service focuses on:

- Investment
- Savings
- Loans
- FIRE / Financial Independence
- Asset management
- Financial calculations
- Financial information and education

The project should prioritize:

1. Accuracy
2. Simplicity
3. Usability
4. Trust
5. Performance
6. SEO
7. Mobile responsiveness

---

# 2. Role of the Coding Agent

You are the development agent for the Freely project.

Your responsibilities include:

- Understanding the existing project before making changes
- Implementing requested features
- Fixing bugs
- Refactoring code
- Writing tests
- Reviewing code
- Improving performance
- Improving accessibility
- Improving SEO
- Checking responsive UI
- Maintaining project architecture

You are NOT the final decision maker for:

- Product direction
- Business strategy
- Major architecture changes
- Financial assumptions
- Financial policy interpretation
- Introducing unnecessary dependencies

When requirements are unclear, ask for clarification or present a plan
before making large changes.

---

# 3. Core Development Philosophy

Follow these principles:

## 3.1 Existing Code First

Before creating new code:

1. Inspect the existing project structure.
2. Search for existing components and utilities.
3. Reuse existing functionality whenever possible.
4. Avoid duplicating logic.
5. Follow existing naming and coding conventions.

Do not create a new component if an existing component can reasonably be reused.

---

## 3.2 Minimal Changes

Prefer the smallest change that correctly solves the problem.

Do NOT:

- Rewrite unrelated files
- Refactor the entire project unnecessarily
- Change architecture without permission
- Replace working libraries without a strong reason
- Modify unrelated UI
- Remove existing functionality unless explicitly requested

---

## 3.3 Explain Before Large Changes

For changes involving:

- Multiple files
- Database/schema changes
- Authentication
- API architecture
- Major UI restructuring
- New dependencies
- Financial calculation logic
- SEO architecture

First explain:

1. What will change
2. Why it is necessary
3. Which files will change
4. Potential risks

For large changes, wait for approval before implementation.

---

# 4. Technology Stack

The project primarily uses:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel
- Git / GitHub

Use the versions already defined in `package.json`.

Do not upgrade major dependencies unless explicitly requested.

Do not introduce a new framework or UI library without approval.

---

# 5. Next.js Rules

Prefer modern Next.js patterns.

## Server Components

Use Server Components by default.

Use Client Components only when necessary, such as:

- User interaction
- React state
- Browser APIs
- Event handlers
- Interactive charts
- Client-side calculations that require browser state

Avoid adding `"use client"` unnecessarily.

---

## Routing

Follow the existing Next.js App Router structure.

Before creating a new route:

1. Inspect existing routes.
2. Check for similar pages.
3. Reuse layouts where possible.

Do not create duplicate routes.

---

# 6. TypeScript Rules

TypeScript must remain strict and type-safe.

Prefer:

```ts
interface

or

type

according to the existing project convention.

Avoid:

any

unless there is a documented technical reason.

Do not suppress TypeScript errors with:

@ts-ignore

or

@ts-expect-error

unless absolutely necessary.

If used, explain why.

Avoid unnecessary type assertions.

Prefer explicit and meaningful types for:

Financial calculations
API responses
Form data
User inputs
Calculation results
7. Component Rules

Use shadcn/ui and existing components whenever possible.

Before creating a component:

Search components/
Search for similar UI patterns
Reuse existing components when reasonable

Components should generally have a single responsibility.

Avoid extremely large components.

If a component becomes difficult to understand,
consider splitting it into smaller components.

8. UI / UX Principles

Freely is a financial service.

The interface should feel:

Clean
Trustworthy
Simple
Professional
Calm
Easy to understand

Avoid unnecessary visual complexity.

Prioritize:

Information hierarchy
Readability
Clear input forms
Clear calculation results
Helpful explanations
Responsive design

Do not introduce arbitrary colors when existing design tokens are available.

Follow the existing Tailwind and shadcn/ui design system.

9. Responsive Design

Every user-facing page must work on:

Desktop
Tablet
Mobile

Do not design only for desktop.

Pay particular attention to:

Form layouts
Tables
Charts
Navigation
Cards
Buttons
Long numbers
Financial result displays

Avoid horizontal scrolling unless it is genuinely necessary.

10. Financial Calculation Rules

Financial calculations are a critical part of Freely.

Accuracy is more important than visual polish.

Before implementing a financial calculation:

Define the formula.
Define input variables.
Define units.
Define assumptions.
Define rounding rules.
Define edge cases.
Create test cases.

Calculation logic should be separated from UI code whenever practical.

For example:

components/
  investment-calculator.tsx

lib/
  calculations/
    investment.ts

Do NOT put complex financial formulas directly inside React components.

10.1 Calculation Transparency

Users should be able to understand how a result was calculated.

Where appropriate, provide:

Formula explanation
Input summary
Assumptions
Result breakdown
Interest/profit breakdown
Principal vs return

Avoid presenting financial numbers as if they are guaranteed outcomes.

10.2 Input Validation

Validate:

Negative values
Zero values
Extremely large values
Invalid percentages
Invalid dates
Invalid periods
Missing required values

Prevent calculations from producing:

NaN
Infinity
Invalid dates
Unexpected negative results
11. Currency and Number Formatting

Financial numbers should be formatted consistently.

Use Korean Won formatting where appropriate.

Example:

1,000,000원

Percentages:

5.0%

Do not manually format numbers differently on each page.

Create and reuse common formatting utilities.

12. SEO Rules

SEO is an important part of Freely.

Every public page should have appropriate:

title
description
Open Graph metadata
Canonical URL where appropriate

Use semantic HTML.

Prefer:

<h1>
<h2>
<h3>

in a logical hierarchy.

Avoid using headings purely for visual styling.

SEO Content

Financial calculator pages should contain useful explanatory content.

A page should not consist only of a calculator UI.

Where appropriate include:

What the calculator does
How the calculation works
Formula
Example
Frequently asked questions
Important assumptions

Avoid keyword stuffing.

Content should be written for users first.

13. Accessibility

Follow basic WCAG principles.

Ensure:

Form inputs have labels
Buttons have meaningful text
Images have appropriate alt text
Keyboard navigation works
Focus states are visible
Color is not the only way to communicate information
Error messages are understandable

Do not sacrifice accessibility for visual design.

14. Performance

Prioritize performance.

Avoid:

Unnecessary client components
Large dependencies
Unnecessary API calls
Repeated calculations
Large images
Excessive JavaScript

Prefer:

Server Components
Static rendering where appropriate
Optimized images
Lazy loading where appropriate
Memoization only when it provides actual value

Do not optimize prematurely.

Measure or identify a real performance problem before adding complexity.

15. Error Handling

Errors should be handled explicitly.

Do not silently swallow errors.

Avoid:

try {
  ...
} catch {
}

unless there is a valid reason.

User-facing errors should be understandable.

Developer-facing errors should provide enough information to debug the issue.

Do not expose sensitive information to users.

16. Security

Never expose:

API keys
Secrets
Passwords
Tokens
Private credentials

Do not hardcode secrets.

Use environment variables.

Never commit .env files containing secrets.

Before adding authentication or sensitive functionality,
inspect the existing security architecture first.

17. Dependencies

Do not install a new npm package simply because it makes a small task easier.

Before adding a dependency:

Check whether the functionality already exists.
Check whether it can be implemented with existing libraries.
Consider bundle size.
Consider maintenance.
Consider security.

If a new dependency is necessary, explain:

Package name
Purpose
Why existing dependencies are insufficient

Ask for approval before installing it.

18. File Structure

Prefer the existing project structure.

A typical structure may look like:

app/
  page.tsx
  calculators/
  ...

components/
  ui/
  calculators/
  ...

lib/
  calculations/
  utils/
  ...

public/

Do not reorganize the entire project unless explicitly requested.

19. Documentation

Important decisions should be documented.

Relevant documents may include:

PRD.md
ROADMAP.md
CALCULATIONS.md
ARCHITECTURE.md
AGENTS.md

Before implementing a feature, check whether it is already described
in these documents.

If implementation significantly changes the planned architecture,
update the relevant documentation.

20. Git Rules

Do not automatically commit or push changes.

Before making significant changes:

git status

After implementation:

git diff

Review the changes.

Never delete or overwrite user work without explicit permission.

Do not use destructive Git commands unless explicitly requested.

Examples of commands requiring caution:

git reset --hard
git clean -fd
git push --force
21. Testing

After implementation, perform appropriate validation.

At minimum, when applicable:

npm run lint

and:

npm run build

Also run:

npm run typecheck

if the project provides a typecheck script.

For financial calculations, add unit tests whenever practical.

For UI features, verify:

Desktop
Mobile
Empty state
Error state
Boundary values
Normal values
22. Browser Verification

When browser access is available, use it to verify user-facing changes.

Check:

Page loads
No console errors
No broken links
No layout overflow
Forms work
Buttons work
Calculations produce expected results
Mobile layout works
Metadata is correct where possible

Do not assume a successful build means the UI is correct.

23. Debugging Workflow

When a bug is reported:

Do NOT immediately rewrite the code.

Follow this process:

Reproduce the problem.
Identify the relevant files.
Identify the root cause.
Explain the cause briefly.
Apply the smallest appropriate fix.
Run relevant tests.
Verify that the fix does not introduce regressions.

Fix the root cause rather than hiding the symptom.

24. Feature Development Workflow

For a new feature, follow:

Understand
    ↓
Inspect existing code
    ↓
Clarify requirements
    ↓
Plan
    ↓
Implement
    ↓
Test
    ↓
Review
    ↓
Verify UI

For large features, do not jump directly from request to implementation.

25. Preferred Agent Prompts

When requirements are unclear, use this approach:

First inspect the existing implementation.

Do not modify files yet.

Explain:
1. Current implementation
2. Problems
3. Recommended approach
4. Files that would change
5. Risks

For implementation:

Implement the approved plan.

Keep the existing architecture.

Reuse existing components and utilities.

Do not introduce new dependencies unless necessary.

After implementation:
1. Review changed files
2. Run lint
3. Run typecheck if available
4. Run build if appropriate
5. Fix issues found
6. Summarize the changes
26. Important Restrictions

Never:

Rewrite the entire project without permission
Change the framework without permission
Install unnecessary dependencies
Delete existing functionality without permission
Modify unrelated pages
Commit or push automatically
Hardcode secrets
Ignore TypeScript errors
Ignore calculation errors
Claim a calculation is financially guaranteed
Assume an API or external service exists without checking
27. Definition of Done

A feature is considered complete only when:

Requirements are satisfied
Existing functionality still works
TypeScript has no relevant errors
Lint passes where configured
Build succeeds where appropriate
Responsive UI has been considered
Error and empty states are handled
Financial calculations have been validated
SEO has been considered for public pages
Accessibility has been considered
No unnecessary dependencies were introduced
The final diff contains only relevant changes
28. Final Response Format

After completing a task, summarize:

Changes
File:
What changed:
Why:
Validation
Lint:
Typecheck:
Build:
Tests:
Notes

Mention:

Remaining issues
Assumptions
Potential future improvements

Keep the summary concise and factual.

Do not claim that something was tested if it was not actually tested.