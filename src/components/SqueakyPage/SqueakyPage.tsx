import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import Header from 'components/Header/Header';
import SESSION from 'config/session';
import PageContainer from './components/PageContainer';
import type { PageContentProps } from './components/PageContent';
import PageContent from './components/PageContent';
import SessionContext from './contexts/SessionContext';
import type { SessionInfo } from './types/SessionInfo';

const SqueakyPage: FC<SqueakyPageProps> = ({ children, isPublic = false, ...rest }) => {
  const router = useRouter();
  const [, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | undefined>(undefined);
  const { noHeader } = rest;

  /** Redirects the current user to the login page */
  const toLogin = useCallback((): void => void router.push('/login'), [router]);

  /**
   * This effect aims to resolve session information from the local storage
   */
  useEffect(() => {
    // early-termination if the page is public
    if (isPublic) return setLoading(false);

    // fetches session information from the local storage
    const storedInfo = localStorage.getItem(SESSION.key);
    if (!storedInfo) return toLogin();

    // invalidates the session if it is expired (if diff <0 the token is expired)
    const sessionInfo = JSON.parse(storedInfo) as SessionInfo;
    const isExpired = DateTime.fromISO(sessionInfo.expiresAt).diffNow().milliseconds <= 0;
    if (isExpired) {
      localStorage.removeItem(SESSION.key);

      return toLogin();
    }

    // registers the authentication in the state
    setAuthenticated(true);
    setSessionInfo(sessionInfo);
    setLoading(false);
  }, [isPublic, toLogin]);

  return (
    <SessionContext.Provider value={sessionInfo}>
      <PageContainer>
        {!noHeader && <Header />}
        {!isLoading && <PageContent {...rest}>{children}</PageContent>}
      </PageContainer>
    </SessionContext.Provider>
  );
};

interface SqueakyPageProps extends PageContentProps {
  /** Makes the page public, without auth barrier, defaults to `false` */
  isPublic?: boolean;
  /** Prevents the header from rendering */
  noHeader?: boolean;
}

export default SqueakyPage;
