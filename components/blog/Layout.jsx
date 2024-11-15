// components/Layout.js
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="min-h-screen text-text bg-background text-text-default">
    <Header />
    <main className="container mx-auto px-4 py-8">{children}</main>
    <Footer/>
  </div>
);

export default Layout;
