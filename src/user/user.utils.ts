export const isUser = async (id, prisma) => {
  console.log(id);
  const user = await prisma.users.findOne({
    where: {
      id: Number(id),
    },
  });
  return user;
};
