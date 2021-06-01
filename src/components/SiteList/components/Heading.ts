import styled from 'styled-components';

const Heading = styled.div`
  align-items: center;
  margin-bottom: 3.2rem;
  display: flex;

  h2 {
    margin: 0;
  }

  a {
    margin-left: 1.6rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Heading;
