import { initBotId } from "botid/client/core";

// Invisible bot detection (Vercel BotID) for the contact form endpoint.
initBotId({
  protect: [
    {
      path: "/api/send",
      method: "POST",
    },
  ],
});
