import { Scalekit } from '@scalekit-sdk/node';

// Initialize the Scalekit client with your credentials
const envUrl = process.env.SCALEKIT_ENVIRONMENT_URL;
const envClientId = process.env.SCALEKIT_CLIENT_ID;
const envClientSecret = process.env.SCALEKIT_CLIENT_SECRET;

if (!envUrl || !envClientId || !envClientSecret) {
  console.warn("Scalekit environment variables are missing");
}

export const scalekit = new Scalekit(
  envUrl || "",
  envClientId || "",
  envClientSecret || ""
);