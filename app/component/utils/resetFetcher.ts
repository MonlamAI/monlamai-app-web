import { Fetcher } from "@remix-run/react";

export function resetFetcher(fetcher: Fetcher) {
  if (!fetcher) return null;
  fetcher?.submit(
    {},
    {
      method: "POST",
      action: "/api/reset_actiondata",
    }
  );
}
