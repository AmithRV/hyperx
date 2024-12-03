import '@/styles/stock-filter/header.css';
import Link from 'next/link';

function Header() {
  return (
    <div className="header-wrap">
      <Link
        href={'https://www.nseindia.com/market-data/live-market-indices'}
        target="_blank"
      >
        nse
      </Link>
    </div>
  );
}

export default Header;
