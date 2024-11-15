// components/Footer.js
const Footer = () => (
  <footer className="bg-background-dark text-text-dark py-6">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
