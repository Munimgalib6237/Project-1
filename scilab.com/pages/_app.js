import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { MainHead } from "../components/head";

function MyApp({ Component, pageProps }) {
  const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
  return (
    <>
      <MainHead />
      <NextNprogress
        color="#581c87"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{ showSpinner: false }}
      />
      <TawkMessengerReact
        propertyId={TAWK_PROPERTY_ID}
        widgetId={TAWK_WIDGET_ID}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
