## Coding standards

### General guidelines
- This project has been initialized with a set of coding standards, refer to the current code as documentation for how files and folders are structured.
- When developing a feature look for existing similar features and try to copy and paste that solution and modify it to your need. Examples:
    - When creating a new domain, look at current domains and follow the same structure.
    - When adding a modal to PageA look at how another page has added a modal.

### Folder structure
- This project uses domain driven development and therefor have dived the folder structure accordingly.
- The only deviation is the shared domain, this is where we put our basic building blocks which other domains will use to build more specific features.

### Translations
- Each module should have its language folder where translations for that module should be added.
- If a text is shared across +1 domain that text belongs in the shared module

### Files
- React Components should be PascalCased and folders should be camelCase, example: `/components/someComponent/SomeComponent.tsx'`
- Interfaces should use the .d ending, example: `someInterface.d.ts`

### Formatting and linting
- Respect the Eslint and Prettier rules, dont use eslint-disable.
- All code formatting and linting should be handled by Eslint and Prettier
- Dont comment on PRs regarding formatting that is not specified in our Eslint and Prettier.
    - If you want to improve our formatting, find the ES rule for it and create a PR to incorporate that rule.
