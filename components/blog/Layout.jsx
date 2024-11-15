// components/Layout.js
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="light flex flex-col min-h-screen bg-background text-text-default">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-10">{children}</main>
    <Footer />
  </div>
)

export default Layout;
