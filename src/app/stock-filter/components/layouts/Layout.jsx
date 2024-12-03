import Header from '@/app/stock-filter/components/Header';
import '@/styles/stock-filter/layout.css';

function Layout({ children }) {
  return (
    <div className="layout-wrap">
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
