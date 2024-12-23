"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function createUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  try {
    if (user) {
      const existing = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (!existing) {
        const createNew = await prisma.user.create({
          data: {
            name: `${user.given_name} ${user.family_name}`,
            email: user.email as string,
          },
        });
        if (createNew) {
          return { ok: true, msg: "created successfully" };
        } else {
          return { ok: false, msg: "failed to create" };
        }
      }

      return { ok: true, msg: "User Already Exist" };
    }
  } catch (err) {
    return { ok: false, msg: "error occurred" };
  }
}

export async function getLinkList() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const user = await getUser();

  try {
    if (isAllowed && user) {
      const userData = await prisma.link.findMany({
        where: {
          user: {
            email: user.email as string,
          },
        },
      });

      if (userData) {
        return { ok: true, data: userData };
      } else {
        return { ok: false, msg: "User Links Not Found!" };
      }
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (error) {
    throw new Error("Error Occurred");
  }
}

export async function getUrlList(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const user = await getUser();

  try {
    if (isAllowed && user) {
      const userURLs = prisma.link.findMany({
        where: {
          id: id,
        },

        include: {},
      });

      //not done yet
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (error) {
    throw new Error("Error Occurred");
  }
}

// OPERATIONS
export async function createLink(link: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();

  const userData = await getUser();

  try {
    if (isAllowed) {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.email as string,
        },
      });

      if (user) {
        if (link && link.length >= 3) {
          const linkCount = await prisma.link.count({
            where: {
              userId: user.id,
            },
          });

          if (linkCount < 5) {
            const existingLink = await prisma.link.findUnique({
              where: {
                link: link,
              },
            });

            if (!existingLink) {
              const create = await prisma.link.create({
                data: {
                  userId: user.id,
                  link: link,
                  views: 0,
                  clicks: 0,
                },
              });

              if (create) {
                revalidatePath("/dashboard");
                return {
                  ok: true,
                  msg: "Link Created!",
                  data: create,
                };
              } else {
                return { ok: false, msg: "Failed to Create Link" };
              }
            } else {
              return { ok: false, msg: "Link Already Exist!" };
            }
          } else {
            return { ok: false, msg: "Maximum Link: 5" };
          }
        } else {
          return { ok: false, msg: "Minimum Length: 3" };
        }
      } else {
        return { ok: false, msg: "User Not Found" };
      }
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (error) {
    throw new Error("Error Occurred");
  }
}

export async function deleteLink(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const userData = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email as string,
    },
  });

  if (isAllowed && user) {
    const deleted = await prisma.link.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (deleted) {
      return { ok: true, msg: "Successfully Deleted!" };
    } else {
      return { ok: false, msg: "Failed To Delete Link" };
    }
  } else {
    return { ok: false, msg: "Unauthorized!" };
  }
}
