import mjml2html from 'mjml';

// import mjmlCore, { registerComponent, BodyComponent } from 'mjml-core';
// import mjmlValidator, { registerDependencies } from 'mjml-validator';

export default mjml2html;

const core = require('mjml-core');

export const mjmlCore = core.default;
export const registerComponent = core.registerComponent;
export const BodyComponent = core.BodyComponent;

export const validator = require('mjml-validator');

export const mjmlValidator = validator.default;
export const registerDependencies = validator.registerDependencies;
