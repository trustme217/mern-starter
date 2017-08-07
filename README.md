## Quickstart
```
git clone https://github.com/Botta217/mern-starter.git your_app
cd your_app
npm install
npm run start
```
**Note: Please make sure your MongoDB is running.**

## Available Commands
1. `npm run start` - starts the production server.

2. `npm run start:dev` - starts the development server with hot reloading enabled.

3. `npm run test` - starts the test runner.

4. `npm run eslint:src` - runs linter to check for lint errors.

## File Structure
### Webpack Configs
MERN users Webpack for bundling modules. There are three types of Webpack configs provided `webpack.base.config.js` (for base configuration), `webpack.app.config.js` (for bundling app), , `webpack.config.server.js` (for bundling server in production).

Webpack is configured to make use of `resolve.alias`, which lets you create aliases to `import` or `require` certain modules more easily.

### Server
MERN uses Express framework.

If `NODE_ENV` is development, we apply Webpack middlewares for bundling and Hot Module Replacement.

### Client
The `app` directory contains all the shared components, routes and reducers.

### Configuration
The `configs` directory contains all configuration settings.

Default project configuration can be found in `~/config/project.config.js`.

The `.scss` file extension is supported out of the box. After being imported, styles will be processed with PostCSS for autoprefixing, and will be extracted to a `.css` file during production builds.

### Test
The `test` directory contains unit test cases.

## License
MERN is released under the [MIT License](https://opensource.org/licenses/MIT)
