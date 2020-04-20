export const isAuthor = async (id, prisma) => {
  const author = await prisma.authors.findOne({
    where: {
      id: Number(id),
    },
  });
  return author;
};
