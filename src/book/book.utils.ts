export const isBook = async (id, prisma) => {
  const book = await prisma.books.findOne({
    where: {
      id: Number(id),
    },
  });
  return book;
};
