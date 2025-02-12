import cron from "node-cron";
import { fetchAndStoreJobs } from "./jobService"; 
// called upon server startup
(async () => {
    console.log("Fetching jobs on server startup...");
    await fetchAndStoreJobs();
  })();

// runs every 24 hours at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled job fetch...");
    await fetchAndStoreJobs();
});