import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <main className="px-8 flex-1 mt-24">{children}</main>
      <Footer />
    </div>
  );
}
