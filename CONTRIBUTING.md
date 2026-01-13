# Contributing to AFCON 2025 Dashboard

We welcome contributions to the AFCON 2025 Dashboard project! Whether you're fixing bugs, adding new features, improving documentation, or optimizing performance, your help is valuable.

Please take a moment to review this document to make the contribution process as smooth as possible.

## Code of Conduct

Please note that this project is released with a [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html). By participating in this project, you agree to abide by its terms.

## How Can I Contribute?

### Reporting Bugs

*   Ensure the bug hasn't already been reported. Search on GitHub Issues.
*   If you can't find an open issue addressing the problem, open a new one.
*   Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

*   Open an issue on GitHub Issues.
*   Use a clear and descriptive title for the issue to identify the suggestion.
*   Provide a step-by-step description of the proposed enhancement.
*   Explain why this enhancement would be useful.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through `good first issue` and `help wanted` issues on GitHub.

### Making Code Changes

1.  **Fork the repository** on GitHub.
2.  **Clone your forked repository** to your local machine:
    ```bash
    git clone https://github.com/[YOUR_USERNAME]/afcon-2025-dashboard.git
    cd afcon-2025-dashboard
    ```
3.  **Create a new branch** for your changes:
    ```bash
    git checkout -b feature/your-feature-name-or-bugfix
    ```
    (Choose a descriptive name for your branch, e.g., `feature/player-stats` or `fix/kpi-card-bug`).
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Make your changes.** Adhere to the existing code style, formatting, and project structure.
    *   **Always use brand colors** as specified in `GEMINI.md`.
    *   **Include team logos** in any team-related displays.
    *   **Use the correct fonts** (Dunbar Low/Text).
    *   **Incorporate visual assets** (patterns, mascot, cup, ball) appropriately.
    *   **Ensure responsiveness** for all screen sizes.
    *   **Add JSDoc comments** for new functions/components and update existing ones where necessary.
    *   **Add PropTypes** for new React components.
    *   **Write clear, concise commit messages.**
6.  **Test your changes.**
    ```bash
    npm run dev
    ```
    Manually verify your changes work as expected and don't introduce new bugs.
7.  **Run linting and fix issues:**
    ```bash
    npm run lint
    ```
8.  **Commit your changes:**
    ```bash
    git add .
    git commit -m "feat: Add new feature" # or "fix: Fix bug in component"
    ```
    (Refer to [Conventional Commits](https://www.conventionalcommits.org/) for commit message guidelines).
9.  **Push your branch to GitHub:**
    ```bash
    git push origin feature/your-feature-name-or-bugfix
    ```
10. **Create a Pull Request (PR):**
    *   Go to your forked repository on GitHub and open a new Pull Request against the `main` branch of the original repository.
    *   Provide a clear title and description for your PR. Explain the changes you've made and why they're necessary.
    *   Reference any related issues (e.g., "Closes #123").

## Styleguides

### Git Commit Messages

*   Use the "Conventional Commits" format.
*   Examples:
    *   `feat: Add player statistics page`
    *   `fix: Correct KPI card trend color`
    *   `docs: Update installation instructions in README`
    *   `refactor: Improve data cleaning in TournamentContext`
    *   `style: Adjust button spacing`

### JavaScript Styleguide

*   Follow the existing ESLint configuration. Run `npm run lint` before committing.
*   Use JSDoc for documenting functions, components, and context providers.
*   Use PropTypes for defining component prop types.

## Data Model Relationships

The data model relationships are documented in the `README.md` file in the "Data Model" section.

Thank you for contributing!
