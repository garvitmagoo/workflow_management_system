import styled from 'styled-components';

const ButtonField = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;

const Button = (props) => {
    return (
        <ButtonField {...props} >{props.children}</ButtonField>
    )
}

export default Button