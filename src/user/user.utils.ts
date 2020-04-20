export const isUser = async (id, prisma) => {
  const user = await prisma.users.findOne({
    where: {
      id: Number(id),
    },
  });
  return user;
};
