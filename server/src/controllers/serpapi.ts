import { Request, Response } from "express";
import { getJson } from "serpapi";
import dotenv from "dotenv";
dotenv.config();

// Use environment variable to store the API key securely
const apiKey = process.env.SERPAPI_KEY;

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const city = req.body.city;

  if (!city) {
    res.status(400).json({ error: "City query parameter is required" });
    return;
  }

  console.log("Fetching events in", city);

  const params = {
    q: `music events in ${city}`,
    google_domain: "google.com",
    gl: "us",
    hl: "en",
    api_key: apiKey || "",
  };

  try {
    const events = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log("Request timed out.");
        reject(new Error("Request timed out"));
      }, 10000); // 10-second timeout

      getJson(params, (json: any) => {
        clearTimeout(timeout); // Clear the timeout if the request completes
        if (json && json["events_results"]) {
          console.log(
            "Callback executed with response:",
            json["events_results"]
          );
          resolve(json["events_results"]);
        } else {
          console.error("Unexpected response format or missing data");
          reject(new Error("Unexpected response format or missing data"));
        }
      });
    });

    console.log("Events data:", events);
    res.json(events); // Send the events data as a JSON response
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};
