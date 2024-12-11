import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedCategories = async () => {
  try {
    // Predefined categories with ID and label
    const categories = [
      { id: 1, label: 'Technology' },
      { id: 2, label: 'Finance' },
      { id: 3, label: 'Health' },
      { id: 4, label: 'Education' },
      { id: 5, label: 'Lifestyle' },
      { id: 6, label: 'Entertainment' },
      { id: 7, label: 'Sports' },
      { id: 8, label: 'Travel' },
      { id: 9, label: 'Food' },
      { id: 10, label: 'Business' },
    ];

    // Upsert categories
    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: { label: category.label },
        create: {
          id: category.id,
          label: category.label,
        },
      });
    }

    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the seed function if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCategories().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export default seedCategories;
