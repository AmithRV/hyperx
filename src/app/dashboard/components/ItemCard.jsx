'use client';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemCard() {
  const router = useRouter();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src="./images/filter.jpg"
        width="250px"
        height="250px"
      />
      <Card.Body>
        <Card.Title>Stock Filter</Card.Title>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => {
            router.push(`/stock-filter`);
          }}
        >
          Browse
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
