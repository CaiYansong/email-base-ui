// .storybook/config.js
// import { configure } from '@storybook/react';

// function loadStories() {
//   require('../stories/index.js'); // 指定 story 的位置
// }

// configure(loadStories, module);

// .storybook/config.js
import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
