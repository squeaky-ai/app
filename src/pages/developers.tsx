import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import hljs from 'highlight.js';
import { Icon } from 'components/icon';
import { Logo } from 'components/logo';
import { Container } from 'components/container';
import { Code } from 'components/developers/code';
import { Main } from 'components/main';
import { Tabs } from 'components/tabs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Developers: NextPage<ServerSideProps> = () => {
  React.useEffect(() => {
    document.querySelectorAll('pre code').forEach((element) => {
      hljs.highlightElement(element as HTMLElement);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Developers</title>
      </Head>

      <Main>
        <div className='hero'>
          <a href='/'>
            <Logo src='logo' height={48} width={154} alt='Logo' />
          </a>
          <h1>Developers</h1>
          <p>Last Updated: <b>September 1st 2021</b></p>
        </div>
        <Container className='md centered'>
          <h4>Tracking Code</h4>
          <p>We recommend that you install the tracking code within the <code className='code'>{'<'}head{'>'}</code> of your page so that it captures as much of the session as possible. Loading the script just before the <code className='code'>{'<'}body{'/>'}</code> could result in the first second or so of a visitors&apos; session being missed.</p>
          <p>The script is very light and loading is non-blocking, so performance should not be a concern.</p>
          <p>You can find the correct script with your site id on the settings page of your site. Every site site is different, but here are some suggestions for where best to place the script into your app.</p>

          <Tabs
            tabs={[
              {
                page: 'ruby',
                name: 'Ruby on Rails',
                icon: 'vip-diamond-line',
                body: (
                  <>
                    <p className='filename'>
                      <Icon name='file-code-line' />
                      app/views/layouts/application.html.erb
                    </p>
                    <Code lang='html'>
{`<!DOCTYPE html>
<html>
  <head>
    ...

    <script>
      (function(s,q,e,a,u,k,y){
        s._sqSettings={site_id:'your-site-id'};
        u=q.getElementsByTagName('head')[0];
        k=q.createElement('script');
        k.src=e+s._sqSettings.site_id;
        u.appendChild(k);
      })(window,document,'https://cdn.squeaky.ai/g/0.4.0/script.js?');
    </script>
  </head>

  <body>
    <%= yield %>
  </body>
</html>`}
                    </Code>
                  </>
                )
              },
              {
                page: 'react',
                name: 'React (Next.js)',
                icon: 'reactjs-line',
                body: (
                  <>
                    <p className='filename'>
                      <Icon name='file-code-line' />
                      pages/_document.tsx
                    </p>
                    <Code lang='typescript'>
{`import NextDocument, { 
  Html, 
  Head, 
  Main, 
  NextScript, 
  DocumentContext,
} from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: \`
            (function(s,q,e,a,u,k,y){
              s._sqSettings={site_id:'your-site-id'};
              u=q.getElementsByTagName('head')[0];
              k=q.createElement('script');
              k.src=e+s._sqSettings.site_id;
              u.appendChild(k);
            })(window,document,'https://cdn.squeaky.ai/g/0.4.0/script.js?');
          \`}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      );
    }
  }
}

export default Document;`}
                    </Code>
                  </>
                )
              }
            ]}
          />

          <h4>User Privacy</h4>
          <p>At Squeaky we care a lot about user privacy. We do not store any Personally Identifiable Information (PII) related to visitors or their recordings, such as their location or IP address. We try our best to make the recordings as free from PII as possible by masking all form data and any non essential meta data.</p>
          <p>PII comes in all shapes and sizes and as a result, some responsibility will fall on the site owner.</p>
          <p>Squeaky offers two css class names that can be used to protect your users&apos; privacy:</p>
          <p><code className='code'>.squeaky-hide</code> will remove everything contained within it, and replace it with an element of the same dimenstions so that it does not effect the rendering of the page. You may want to use this if there is a large section of text, or some PII that is not in text form (such as an image).</p>

          <p>It could look like the following:</p>
          <Code lang='html'>
{`<div class="squeaky-hide">
  <p>Name: Bob</p>
  <p>Email: bob@squeaky.ai</p>
  <img src="/images/profile-image.png">
</div>`}
          </Code>

          <p><code className='code'>.squeaky-mask</code> will replace all text contained with asterisks. This is more suited to small pieces of text, such as a users&apos; name appearing within a section of non identifiable text.</p>

          <p>A common sitation may be:</p>

          <Code lang='html'>
{`<p>Welcome back, <span class="squeaky-mask">Bob</span></p>`}
          </Code>

          <h4>User Identification</h4>
          <p>Privacy is important, however there are times that you may want to link some attributes to a Squeaky visitor. By default, a visitor is completely anonymous, although the site owner can associate any attributes they want with a visitor.</p>
          <p>This is achieved by using the <code className='code'>squeaky.identify()</code> method that is exposed by the Squeaky script. The identify method accepts any key/values, but keys named <code className='code'>email</code> or <code className='code'>name</code> will have the added benefit of being indexed for search on the visitors page.</p>

          <p>The identify method takes two arguments. The first is your users unique id (likely the id generated by your database), followed by a javascript object containing the key/value pairs you&apos;d like to associate:</p>

          <Code lang='typescript'>
{`squeaky.identify('<your-users-uniqueid>', {
  foo: 'bar',
  bar: 'baz',
  ...
});`}
          </Code>

          <p>Once again, every site is different and the location of this is best left to you. You only need to identify a user once per session, so it can be hoisted up fairly high. Here is a recommendation:</p>

          <Tabs
            tabs={[
              {
                page: 'ruby',
                name: 'Ruby on Rails',
                icon: 'vip-diamond-line',
                body: (
                  <>
                    <p className='filename'>
                      <Icon name='file-code-line' />
                      app/views/layouts/application.html.erb
                    </p>
                    <Code lang='html'>
{`...

<body>
  <%= yield %>
  
  <% if user_signed_in? %>
    <script type="text/javascript">
      window.addEventListener('load', () => {
        squeaky.identify('<%= current_user.id %>', {
          name: '<%= current_user.full_name %>',
          email: '<%= current_user.email %>'
        });
      });
    </script>
  <% end %>
</body>`}
                      </Code>
                  </>
                )
              },
              {
                page: 'react',
                name: 'React (Next.js)',
                icon: 'reactjs-line',
                body: (
                  <>
                    <p className='filename'>
                      <Icon name='file-code-line' />
                      pages/_app.tsx
                    </p>
                    <Code lang='typescript'>
{`import React, { FC } from 'react';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // This assumes you are fetching the logged in user server side
    const { user } = pageProps;

    if (!user) return;

    window.addEventListener('load', () => {
      squeaky.identify(user.id, {
        name: user.fullName,
        email: user.email,
      });
    });
  }, []);

  return <Component {...pageProps} />;
};`}
                      </Code>
                  </>
                )
              }
            ]}
          />

          <p>The Squeaky script initializes and loads asynchronously, and depending on how lightweight your page is, may not be loaded by the time you try to identify the user. It is best to wait for the page to finish entirely before attempting to identify a user.</p>
        </Container>
      </Main>
    </>
  );
};

export default Developers;
export { getServerSideProps };
