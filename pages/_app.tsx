import '../src/app/globals.css'; // Ensure this imports Tailwind CSS
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar'; // Import Navbar

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 