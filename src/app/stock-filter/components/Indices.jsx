import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import '@/styles/stock-filter/dashboard.css';

function Indices({ indices = [] }) {
  return (
    <div className="ml-4 indices">
      <ListGroup className="mx-4">
        {indices.map((e, index) => (
          <ListGroup.Item
            className="bg-dark text-white d-flex justify-content-between"
            key={index}
          >
            <Link
              href={`https://www.nseindia.com/market-data/live-equity-market?symbol=${e.indexSymbol}`}
              className="text-white text-decoration-none w-100"
              target="_blank"
            >
              {e?.index}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Indices;
