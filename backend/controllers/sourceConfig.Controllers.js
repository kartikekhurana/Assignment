import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

const addSourceConfig = async (req, res) => {
  const { tenantId } = req.params;
  const { host, port, username, password } = req.body;
  try {
    const config = await Prisma.sourceConfig.create({
      data: {
        host,
        port: parseInt(port),
        username,
        password,
        tenant: {
          connect: { id: parseInt(tenantId) },
        },
      },
    });
    res.status(201).json({
      success: true,
      message: "source config added successfully",
      config,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message || "error while adding source config",
    });
  }
};
const getSourceConfig = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const config = await Prisma.sourceConfig.findUnique({
      where: {
        tenantId: parseInt(tenantId),
      },
    });
    if (!tenantId) {
      res.status(400).json({
        success: "false",
        message: "No source config found for this tenant",
      });
    }
    res.status(200).json({
      success: true,
      message: "source config fetched successfully",
      config,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message || "error while fetching source config",
    });
  }
};

export { addSourceConfig, getSourceConfig };
