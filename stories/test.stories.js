import React from 'react';
// import { storiesOf } from '@storybook/react';

// storiesOf('Test', module)
//   .add('test add', () => (  // 一个 story
//     <div>test</div>
//   ));

export default {
  title: 'EDM/test',
  component: <div>test</div>,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args)=>{
  return (<div>
    test template
  </div>)
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Base test';
