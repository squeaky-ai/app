import styled from 'styled-components';

const Spinner = styled.div`
  animation: spin 1.1s infinite linear;
  border-top: .5rem solid rgba(255, 255, 255, 0.2);
  border-right: .5rem solid rgba(255, 255, 255, 0.2);
  border-bottom: .5rem solid rgba(255, 255, 255, 0.2);
  border-left: .5rem solid ${({ theme }) => theme.colors.blue};;
  border-radius: 50%;
  font-size: 10px;
  height: 5rem;
  margin: 60px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 5rem;
  

  &:after {
    border-radius: 50%;
    height: 10rem;
    width: 10rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
