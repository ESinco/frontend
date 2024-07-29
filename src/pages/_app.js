import Layout from "@/components/Layout";
import "../app/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// TODO: VERIFY IF THIS IS THE BEST WAY BECAUSE THERE WILL BE PAGES WHICH WE WILL NOT USE THE
// NAVBAR NOR THE LAYOUT, WHAT WE DO THEN?
