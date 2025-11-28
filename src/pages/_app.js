import "@/styles/globals.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>TIIU Admission</title>
        {/* <!-- Meta Pixel Code --> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '707326858329597');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=707326858329597&ev=PageView&noscript=1"
          />
        </noscript> */}
        {/* <!-- End Meta Pixel Code --> */}

        {/* <!-- Meta Pixel Code --> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '322106594178664');
fbq('track', 'PageView');`,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            // style="display:none"
            src="https://www.facebook.com/tr?id=322106594178664&ev=PageView&noscript=1"
          />
        </noscript> */}
        {/* <!-- End Meta Pixel Code --> */}
      </Head>
      <NextNProgress
        color="#ffffff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showSpinner={false}
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
      <Component {...pageProps} />;
    </Provider>
  );
}
