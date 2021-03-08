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

### Changing data

The [src/data](./src/data) directory holds static data the app uses, like names of Government agencies, API urls, and information about each query field. It's possible to change this data without touching any other code.

Data is stored as json or other javascript data types.

#### Fields

Available API Fields are stored in [fields.js](./src/data/fields.js) as a json object of objects, keyed by field attribute. The value of each field is an object with the following keys:

| Key  | Data Type | Default | Required | Usage |
|------|-----------|---------|-------|----------|
| live | boolean   | false   | Yes | fields are hidden in the app unless live is `true` |
| attribute | string | n/a | Yes | url-friendly, machine-readable name of the field that is used for the url query parameter. Attribute should correspond to the field object's key |
| title | string | n/a | Yes | Display name of the field |
| order | number | n/a | Yes | Available fields are ordered (ascending) by this number. It's possible to use a float or negative number to re-order fields. |
| input | string, one of: `"text"`, `"select"` | n/a | Yes | auto-generates the input field in the app. Type `"select"` requires `input_options` |
| input_options | array of objects (see below) | n/a | Yes when using input type `"select"`; otherwise No | provides the options for a field's select input |
| category | string | n/a | No | The field category, should fields need to be grouped |

#### Field input options

for any field with input type `"select"`, the value of `input_options` must be an array of objects with the following keys:

| Key | Data Type | Required | Usage |
|-----|-----------|----------|-------|
| label | string | Yes | Display name of the option |
| value | string, number, or boolean | Yes | the value of the option |

#### Agency / Bureau Data

[agency_bureau_data.js](./src/data/agency_bureau_data.js) is an array of objects with the following keys:

| Key | Data Type | Required | Usage |
|-----|-----------|----------|-------|
| Agency Name | string | Yes | Display name of agency |
| Bureau Name | string | Yes | Display name of bureau |
| Agency Code | string | No  | Code of agency |
| Bureau Code | string | No  | Code of bureau |
| Treasury Code | string | No  | Code of treasury |
| CGAC Code | string | No | unique code for each agency |

#### API

[api.js](./src/data/api.js) holds any info related to the API, like the current endpoint, pathname, or demo key.

#### Links

[links.js](./src/data/links.js) is where any other external links can be configured.

### Component Architecture

The entry point for the app is [`<QueryBuilder />`](./src/components/modules/query-builder.js).

The QueryBuilder component contains the major modules of the app:
- `<AvailableFields />` generates the list of API fields able to be filtered by the user
- `<SelectedFields />` displays the filters the user has selected
- `<BuilderActions />` contains any user affordances, like copying the API link
- `<Instructions />` contains the instructional text

Spotlight UI uses fairly new React features, so here are some links to relevant documentation:

- [Basic hooks (`useState`, and `useEffect`)](https://reactjs.org/docs/hooks-reference.html#basic-hooks)
- [Context](https://reactjs.org/docs/context.html)

### State Management

The app uses [redux](https://redux.js.org/) for global state management and [react-redux](https://react-redux.js.org/) to connect components to the global state.

Currently there's only one Reducer being used in the app, managing the user's field selections.

The Redux store is created in [src/redux/index.js](./src/redux/index.js) and used in `<QueryBuilder />`.

Individual Reducers conform to the [ducks pattern](https://github.com/erikras/ducks-modular-redux) and are found under [src/redux/ducks](./src/redux/ducks).

This app uses a Redux middleware to sync the app url to field selections. This allows a user to share their field selections by sharing the app url. It also allows the user to maintain where they left off on a page reload. Middleware can be found under [src/redux/middleware](./src/redux/middleware).

If state is relevant to a component only, then it's managed through React's `useState` and `useEffect` hooks.

Reducers are tested using Jest.

### Building and deploying

Spotlight UI is configured to deploy to Federalist. Builds are validated by CircleCI.
