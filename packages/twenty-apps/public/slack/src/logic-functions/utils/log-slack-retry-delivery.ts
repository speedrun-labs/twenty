import { isNonEmptyString } from '@sniptt/guards';

// Slack re-delivers an event when it does not get a 200 within 3 seconds, up to
// three times, each retry stamped with these headers. Logging them makes the
// retry rate observable; the unique index on the request already dedupes the
// re-deliveries themselves.
export const logSlackRetryDelivery = ({
  headers,
  source,
}: {
  headers: Record<string, string | undefined>;
  source: string;
}): void => {
  const retryNum = headers['x-slack-retry-num'];

  if (!isNonEmptyString(retryNum)) {
    return;
  }

  const retryReason = headers['x-slack-retry-reason'] ?? 'unknown';

  console.warn(
    `[slack] ${source} retry delivery: attempt ${retryNum}, reason ${retryReason}`,
  );
};
