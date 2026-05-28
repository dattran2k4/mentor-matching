ALTER TABLE payments
    ADD COLUMN provider_reference_id VARCHAR(255) NULL AFTER paid_at,
    ADD COLUMN provider_transaction_id VARCHAR(255) NULL AFTER provider_reference_id,
    ADD COLUMN checkout_url TEXT NULL AFTER provider_transaction_id,
    ADD COLUMN expires_at DATETIME NULL AFTER checkout_url,
    ADD COLUMN failure_reason TEXT NULL AFTER expires_at;

CREATE INDEX idx_payments_provider_reference_id ON payments (provider_reference_id);
CREATE INDEX idx_payments_provider_transaction_id ON payments (provider_transaction_id);
