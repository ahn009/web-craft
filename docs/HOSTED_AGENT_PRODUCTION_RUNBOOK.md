# Hosted Agent Production Runbook

## Required Secrets

Set these outside git before production deploy:

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: unique 32+ character secret.
- `CREDENTIAL_ENCRYPTION_KEY`: unique 32-byte key for user credential encryption.
- `N8N_API_KEY`: n8n API key for internal workflow import and execution.
- `N8N_ENCRYPTION_KEY`: stable n8n encryption key. Do not rotate casually.
- `SENDGRID_API_KEY`: optional transactional email key.

Keep `CREDENTIAL_ENCRYPTION_KEY` and `N8N_ENCRYPTION_KEY` backed up in the secret manager. Losing either can make saved credentials unusable.

## Services

Production requires:

- `app`: Fastify API and static frontend.
- `worker`: execution queue processor.
- `db`: PostgreSQL.
- `n8n`: internal workflow runtime.

The worker runs `node dist/scripts/process-executions.js` in a loop. It claims queued executions, submits them to n8n, records output/errors, and exits cleanly between polling cycles.

## Deployment Checklist

1. Set production environment variables.
2. Confirm `NODE_ENV=production`.
3. Confirm `ENABLE_TEST_ROUTES=false`.
4. Confirm `CHECKOUT_MODE=disabled` unless real payments are ready.
5. Run database migrations with `npx prisma migrate deploy`.
6. Start `app`, `worker`, `db`, and `n8n`.
7. Check `/health`.
8. Confirm worker logs show queue polling without crashes.
9. Create a test agent instance and verify a failed run produces a visible error if n8n is not configured.

## Backup and Restore

Back up:

- PostgreSQL database.
- n8n persistent volume.
- Secret manager values for credential and n8n encryption keys.

Restore order:

1. Restore PostgreSQL.
2. Restore n8n volume.
3. Restore secrets.
4. Start n8n.
5. Start app.
6. Start worker.

## Monitoring

Track:

- API health status.
- Worker restart count.
- Count of `QUEUED` and `RUNNING` executions.
- Failed execution rate.
- n8n API errors.
- Database connection errors.
- Output-size-limit failures.

Useful queries:

```sql
SELECT status, COUNT(*) FROM "AgentExecution" GROUP BY status;
SELECT * FROM "AgentExecution" WHERE status = 'FAILED' ORDER BY "createdAt" DESC LIMIT 20;
```

## Operational Limits

Current controls:

- `EXECUTION_MAX_ACTIVE_PER_USER`: limits queued/running executions per user.
- `EXECUTION_MAX_OUTPUT_BYTES`: prevents oversized output storage.
- `N8N_TIMEOUT_MS`: caps API call duration from WebCraft to n8n.

Raise limits only after reviewing database size, n8n capacity, and worker throughput.

## Rollback

If hosted execution causes production issues:

1. Stop the `worker` service first.
2. Leave `app` running so users can still browse and manage agents.
3. Set `N8N_API_KEY` empty to disable new n8n imports.
4. Investigate failed executions from `AgentExecution` and `AgentExecutionLog`.
5. Redeploy the previous image if API behavior is affected.

## Security Notes

- Never log decrypted credentials.
- Never return encrypted payloads from API responses.
- Keep n8n private to the internal network when possible.
- Restrict n8n API keys to the minimum required operations.
- Rotate user credentials by asking users to replace saved credentials in WebCraft.
- Treat database dumps as sensitive because they contain encrypted user secrets.
