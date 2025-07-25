import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTenant = async (req, res) => {
  const { name, email, timezone } = req.body;
  try {
    const tenant = await prisma.tenant.create({
      data: { name, email, timezone },
    });
    res.status(200).json({
      success: true,
      tenant,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message || "error while creating tenant",
    });
  }
};
const getTenants = async (req, res) => {
  try {
    const Tenants = await prisma.tenant.findMany({
      include: { sourceConfig: true },
    });
    res.status(200).json({
      success: true,
      message: "fetched all tenants",
      Tenants,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: true,
      message: error.message || "error while fetching tenants",
    });
  }
};

export { createTenant, getTenants };
