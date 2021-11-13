import React from 'react';

import MjDiv from '../packages/mj-div/lib/mj-div';

export default {
  title: 'EDM/mg-div',
  component: MjDiv,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  return (
    <mjml>
      <mj-body>
        <MjDiv css-class="mj-div" padding="9px" >
          <mj-section css-class="section">
            <mj-column css-class="column" >
              <mj-text css-class="text" >out section </mj-text>
            </mj-column>
          </mj-section>
        </MjDiv>

        <mj-section css-class="section">
          <MjDiv css-class="mj-div" padding="9px">
            <mj-text>mj div width section</mj-text>
          </MjDiv>
        </mj-section>

        <mj-section css-class="section">
          <mj-column css-class="column" >
            <MjDiv css-class="mj-div" padding="9px">
              <mj-text>mj div width column</mj-text>
            </MjDiv>
          </mj-column>
        </mj-section>

        <mj-section css-class="section">
          <mj-column css-class="column" background-color="gray" >
            <mj-text css-class="text" container-background-color="red" align="center" color="#333">section column</mj-text>
          </mj-column>
          <mj-column css-class="column" background-color="blue" >
            <mj-text css-class="text" align="center" background-color="pink" color="#333">section column</mj-text>
          </mj-column>
        </mj-section>

        <MjDiv css-class="mj-div">
          <mj-text>mj div width text</mj-text>
        </MjDiv>

        <MjDiv css-class="mj-div1" padding="9px">
          <MjDiv css-class="mj-div2" padding="9px">
            <mj-text>mj div width div</mj-text>
          </MjDiv>
        </MjDiv>

        <MjDiv css-class="mj-div" padding="9px" border="1px solid blue" background-color="yellow" border-radius="10px">
          <mj-text css-class="text" container-background-color="red" align="center" color="#333">test bg</mj-text>
        </MjDiv>

        <mj-section css-class="section" padding="0" >
          <mj-column css-class="column" padding="0" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" align="center" color="#333">column bg</mj-text>
          </mj-column>
        </mj-section>

        <MjDiv css-class="mj-div" padding="0" border="1px solid blue" background-color="yellow" border-radius="10px">
          <mj-text css-class="text" container-background-color="red" align="center" color="#333">div bg</mj-text>
        </MjDiv>

        <MjDiv css-class="1" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <MjDiv css-class="21" display="inline-block" width="50%" out-padding="0 5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" align="center" color="#333">column bg</mj-text>
          </MjDiv>
          <MjDiv css-class="22" display="inline-block" width="50%" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" align="center" color="#333">column bg</mj-text>
          </MjDiv>
          <MjDiv css-class="23" out-padding="5px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <MjDiv css-class="33" out-padding="5px" padding="10px" border="1px solid blue" background-color="pink" border-radius="10px">
              <mj-text container-background-color="red" align="center" color="#333">column bg</mj-text>
            </MjDiv>
          </MjDiv>
          <MjDiv css-class="24" display="block" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text container-background-color="red" align="center" color="#333">column bg</mj-text>
          </MjDiv>
        </MjDiv>

        <MjDiv css-class="1" padding="10px" background-color="gray" border-radius="10px" white-space="nowrap">
          <MjDiv css-class="21" display="inline-block" width="50%" height="138px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
            <mj-text align="center" color="#333">left one</mj-text>
          </MjDiv>
          <MjDiv css-class="22" display="inline-block" width="50%" out-padding="0 0 0 8px" padding="0">
            <MjDiv css-class="32" height="54px" out-padding="0 0 8px 0" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text align="center" color="#333">right two</mj-text>
            </MjDiv>
            <MjDiv css-class="33" height="54px" padding="10px" border="1px solid blue" background-color="yellow" border-radius="10px">
              <mj-text align="center" color="#333">right two</mj-text>
            </MjDiv>
          </MjDiv>
        </MjDiv>

        <MjDiv>
          <mj-navbar>
            <mj-navbar-link href="https://www.aliexpress.com">navbar</mj-navbar-link>
            <mj-navbar-link href="https://www.aliexpress.com">navbar</mj-navbar-link>
          </mj-navbar>
        </MjDiv>
      </mj-body>
    </mjml>
  );
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = 'Base mj-bg';