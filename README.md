# Spotlight UI

## Getting Started

This project runs on Gatsby, which requires node and npm, so you'll need to make sure you have those.
Then, after cloning this repository, run `npm install` (you only need to do this once).

To get the dev server running, just run `npm run develop` in the project's root folder.

## Testing

Spotlight UI has 3 layers of testing.

### Static

- [ESLint](https://eslint.org/) does static checking of JavaScript syntax and some stylistic matters.
- [Prettier](https://prettier.io/) formats the code.

If you haven't got them already, you should install the editor plugins for these tools. But even if you don't, they'll be run in a pre-push hook. The hooks are configured by [Husky](https://github.com/typicode/husky).

### Unit/Integration Testing

The component-level testing uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) with [Jest](https://jestjs.io/) as the test runner. React Testing Library encourages blackbox testing of components rather than unit testing implementation details, and this project's tests were written in that spirit. The test suite runs as a pre-commit hook as well as on Circle, but can be run manually with `npm run test` or `npm run test:watch`.

### End-to-End Testing

The integration tests just mock any API interactions, so to make sure the app really works, [Cypress](https://www.cypress.io/) runs end-to-end tests as part of build. The end to end tests ensure each page is navigable, loads data, and applies filters as expected. To run the E2E tests locally, `npm run test:e2e`.

## How it Works

### Component Architecture

Each report is a separate page under `/src/pages`. The page contains the basic configuration for which columns a report will pull in from the API. The setup for these is straightforward: Each column gets a human readable name (`title`), and a function to pluck out the relevant value from the data returned from the API (`accessor`—many of these use the new [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) syntax, which is just something to be aware of).

The pages wrap each `<Report />` in a `<ReportQueryProvider />`. This component uses React [Context](https://reactjs.org/docs/context.html) to make the reducer used to manage queries and filters available to child components.

The `<Report />` component performs the main query to the API and renders the data into a table.

`<ReportFilters />` renders the appropriate filters for each report and, when those filter values change, passes the request back up to the report. It also makes a couple of API calls to populate the agency and scan data filters.

`<Pagination />` is pretty straightforward, and sends page navigation requests back up to the `<Report />` (via the `<ReportQueryProvider />`).

Spotlight UI uses fairly new React features, so here are some links to relevant documentation:

- [Basic hooks (`useState`, and `useEffect`)](https://reactjs.org/docs/hooks-reference.html#basic-hooks)
- [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Context](https://reactjs.org/docs/context.html)

### Building and deploying

Spotlight UI is configured to deploy to Federalist. Builds are validated by CircleCI.
