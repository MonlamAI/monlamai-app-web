import { db } from "~/services/db.server";
import { subMinutes, isBefore } from "date-fns";
export async function saveIpAddress({ userId, ipAddress }) {
  try {
    // Fetch the most recent log entry for the user
    if (userId) {
      const lastLog = await db.userLog.findFirst({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: "desc" },
      });

      const now = new Date();
      const fiveMinutesAgo = subMinutes(now, 5);

      // Check if the last log entry is within the last 5 minutes
      if (lastLog && isBefore(fiveMinutesAgo, lastLog.createdAt)) {
        console.log("A log entry already exists within the last 5 minutes.");
        return null;
      }
    }
    // Create a new UserLog entry with the provided userId and ipAddress
    const userLog = await db.userLog.create({
      data: {
        userId: userId ? parseInt(userId) : null,
        ip: ipAddress,
      },
    });

    return userLog;
  } catch (error) {
    console.error("Error saving IP address:", error);
    return error;
  }
}
