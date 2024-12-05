'use client';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemCard({ label = '', image = '', link = '' }) {
  const router = useRouter();

  return (
    <Card style={{ width: '18rem' }} className="mx-4">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{label}</Card.Title>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => {
            router.push(link);
          }}
        >
          Browse
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
