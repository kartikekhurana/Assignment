import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const togglePipeline = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: parseInt(tenantId) },
      select: { isPipelineOn: true },
    });
    if (!tenant) {
      return res.status(400).json({
        success: false,
        message: "Tenant not found",
      });
    }
    const updateTenant = await prisma.tenant.update({
      where: { id: parseInt(tenantId) },
      data: {
        isPipelineOn: !tenant.isPipelineOn,
      },
    });
    res.status(200).json({
      success: true,
      message: "Pipeline status updated successfully",
      tenant: updateTenant,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message || "error while updating pipeline status",
    });
  }
};
