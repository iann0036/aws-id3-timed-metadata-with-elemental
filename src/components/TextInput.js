import React, { useState } from 'react';
import styled from 'styled-components';

// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;

const TextInput = (props) => {
  return (
    <div>
      <StyledInput
        placeholder={props.placeholder}
      />
    </div>
  );
}
export default TextInput;