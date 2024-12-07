import { useRouter } from 'next/navigation';

import '@/styles/stock-filter/header.css';
import '@/styles/todo-list/header.css';

function Header() {
  const router = useRouter();

  return (
    <div className="header-wrap">
      <div className="loader">
        <div
          className="circle"
          onClick={() => {
            router.push('/dashboard');
          }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
