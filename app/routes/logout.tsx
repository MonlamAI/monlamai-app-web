import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { auth } from "~/services/auth.server";

import { destroySession, getUserSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);
  let domain = process.env.AUTH0_DOMAIN as string;
  let requestUrl = new URL(request.url);
  let redirect_url = requestUrl.hostname as string;
  let clientId = process.env.AUTH0_CLIENT_ID as string;

  let IdToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUwMXVlTHY5UjJ2WGk0SzdNSnF5QiJ9.eyJnaXZlbl9uYW1lIjoiVGVua3VzIiwiZmFtaWx5X25hbWUiOiJMYSIsIm5pY2tuYW1lIjoidGVua3VzNDciLCJuYW1lIjoiVGVua3VzIExhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lubThWeGlZbjVLejVLS3R6aUZXdV8yNGsyaEZxcW1mQnNNODh3emd3SkJ4TDM9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIzLTEwLTI0VDA3OjI5OjE5LjE4NFoiLCJlbWFpbCI6InRlbmt1czQ3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi12ejZvMTdtb3RjMThnNDVoLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJrdUludGxkckdZYWoxQmVPTnBwYzl6TVViQmUyUENTZiIsImlhdCI6MTY5ODEzNDc4NSwiZXhwIjoxNjk4MTcwNzg1LCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNDUzNTUyNzgzMzIwMTk0MzQyNCIsInNpZCI6InczMmdMa3FHZVBfZHdsUUluVDNpUzRvZDczanUzTkxCIn0.T5VgsewXz_PfLG_pjg0dl4H5hyXOLrWbUibbJaHQy9V-i_2JoFn3-6n4r3C6BeMuM3FdsjnnbMcSlLSw9wYoBYa9FErBuWkTAJ94h8MRTQ8YveQnVV0J_stpSZlHL_wZ1QZAIRz4oF0k1E4q_xsyX-jv6upWMksFsF8RmoCujmpk0igL1RcVS1deA8AfciNAIZop2zXinmkdlK1q9n1VGN_9OqqfezG7sjALptMCsyQgQbLO4bk04guuW3rEbQt_-bsaCj5--Hylz1sdibzuUwBhAUv9AVDuzdKGEz8kutWwdWOj0CJabbIxaeWMPkIhyXNMu-BokrMKpFHCh8eO2A";
  let url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${redirect_url}`;

  return redirect(url, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
