import styled from 'styled-components';

const SiteListItem = styled.li`
  list-style: none;
  margin: 0 0 .75rem 0;

  a { 
    align-items: center;
    background-color: ${({ theme }) => theme.colors.default.background};
    border: 2px solid ${({ theme }) => theme.colors.default.background};
    border-radius: ${({ theme }) => theme.borders.radiusSmall};
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    color: ${({ theme }) => theme.colors.default.neutralDark};
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 3.2rem 1fr 1fr 1fr;
    padding: 2.4rem;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.default.neutralDark};
      border-color: ${({ theme }) => theme.colors.blue};
    }

    .url {
      color: ${({ theme }) => theme.colors.default.neutralMedium};
    }
  }
`;

export default SiteListItem;
