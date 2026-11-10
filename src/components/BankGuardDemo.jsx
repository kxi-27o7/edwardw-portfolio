'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LoaderCircle, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react';

const API_URL = (
  process.env.NEXT_PUBLIC_BANKGUARD_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : '')
).replace(/\/+$/, '');
const SEED_COUNT = 30;
const INITIAL_BALANCE = 50_000_000;
const MAX_AMOUNT = 50_000_000;
const MAX_BALANCE = 1_000_000_000;
const MAX_SEED_SPEND = Math.floor((MAX_BALANCE - 1) / SEED_COUNT);
const FRAUD_THRESHOLD = 0.70;
const TRANSACTION_TYPES = ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT', 'DEBIT'];

const currency = new Intl.NumberFormat('en-ID', {
  maximumFractionDigits: 0,
});

function formatIdr(amount) {
  return `Rp${currency.format(amount)}`;
}

function balanceAfterTransaction(type, balance, transactionAmount) {
  const numericBalance = Number(balance);
  const numericAmount = Number(transactionAmount);
  if (!Number.isFinite(numericBalance) || !Number.isFinite(numericAmount)) return '';
  const nextBalance = type === 'DEPOSIT'
    ? numericBalance + numericAmount
    : numericBalance - numericAmount;
  return String(Math.max(0, Math.round(nextBalance * 100) / 100));
}

export default function BankGuardDemo() {
  const [minimumSpend, setMinimumSpend] = useState('150000');
  const [maximumSpend, setMaximumSpend] = useState('750000');
  const [history, setHistory] = useState([]);
  const [startingBalance, setStartingBalance] = useState(INITIAL_BALANCE);
  const [transactionType, setTransactionType] = useState('PAYMENT');
  const [amount, setAmount] = useState('200000');
  const [oldBalance, setOldBalance] = useState('5000000');
  const [newBalance, setNewBalance] = useState('4800000');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function generateHistory(event) {
    event.preventDefault();
    setError('');
    setResult(null);

    const min = Number(minimumSpend);
    const max = Number(maximumSpend);
    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      min < 0 ||
      max < min ||
      max > MAX_SEED_SPEND
    ) {
      setError('Enter a valid IDR range: minimum must be non-negative and no greater than the maximum.');
      return;
    }

    const balance = Math.max(INITIAL_BALANCE, Math.ceil(max * SEED_COUNT) + 1);
    const generated = [];
    let remainingBalanceCents = Math.round(balance * 100);

    for (let index = 0; index < SEED_COUNT; index += 1) {
      const generatedAmountCents = Math.round((min + Math.random() * (max - min)) * 100);
      const previousBalance = remainingBalanceCents / 100;
      remainingBalanceCents -= generatedAmountCents;
      generated.push({
        transactionType: 'PAYMENT',
        amount: generatedAmountCents / 100,
        oldBalance: previousBalance,
        newBalance: remainingBalanceCents / 100,
      });
    }

    setStartingBalance(balance);
    setHistory(generated);
    const endingBalance = remainingBalanceCents / 100;
    setOldBalance(String(endingBalance));
    setNewBalance(balanceAfterTransaction(transactionType, endingBalance, amount || 0));
  }

  async function scoreTransaction(event) {
    event.preventDefault();
    if (history.length < 24 || isLoading) return;

    if (!API_URL) {
      setError('The BankGuard model service is not configured for this deployment yet.');
      return;
    }

    const transaction = {
      transactionType,
      amount: Number(amount),
      oldBalance: Number(oldBalance),
      newBalance: Number(newBalance),
    };

    if (
      !Number.isFinite(transaction.amount) ||
      transaction.amount <= 0 ||
      transaction.amount > MAX_AMOUNT ||
      !Number.isFinite(transaction.oldBalance) ||
      transaction.oldBalance < 0 ||
      transaction.oldBalance > MAX_BALANCE ||
      !Number.isFinite(transaction.newBalance) ||
      transaction.newBalance < 0 ||
      transaction.newBalance > MAX_BALANCE
    ) {
      setError('Enter an amount above zero and valid non-negative balances in IDR.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, transaction }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const detail = typeof payload?.detail === 'string' ? payload.detail : '';
        throw new Error(detail || 'The transaction could not be analyzed. Please try again.');
      }

      if (
        (payload?.isFraud !== 0 && payload?.isFraud !== 1) ||
        (payload?.probability !== null &&
          (typeof payload?.probability !== 'number' ||
            !Number.isFinite(payload.probability) ||
            payload.probability < 0 ||
            payload.probability > 1))
      ) {
        throw new Error('The model service returned an unexpected response. Please try again.');
      }

      setResult(payload);
      setHistory((previousHistory) => [...previousHistory, transaction].slice(-100));
      setOldBalance(String(transaction.newBalance));
      setNewBalance(balanceAfterTransaction(transactionType, transaction.newBalance, amount));
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'The BankGuard model service is unavailable. Please try again later.'
          : requestError.message || 'The transaction could not be analyzed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetDemo() {
    setHistory([]);
    setStartingBalance(INITIAL_BALANCE);
    setResult(null);
    setError('');
    setOldBalance('5000000');
    setNewBalance('4800000');
    setAmount('200000');
    setTransactionType('PAYMENT');
  }

  return (
    <section
      aria-labelledby="bankguard-demo-title"
      className="theme-border theme-surface-inset mt-8 rounded-2xl border p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="theme-accent font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            Interactive model demo
          </p>
          <h4 id="bankguard-demo-title" className="theme-text-primary mt-2 text-lg font-bold">
            Explore transaction risk scoring
          </h4>
          <p className="theme-text-secondary mt-2 max-w-2xl text-sm leading-6">
            Create a synthetic spending history, then submit transactions to see how the trained model scores them.
          </p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={resetDemo}
            disabled={isLoading}
            className="theme-text-secondary theme-hover-accent inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw aria-hidden="true" size={15} />
            Reset demo
          </button>
        )}
      </div>

      <div className="theme-border theme-surface mt-5 grid gap-5 rounded-xl border p-4 sm:p-5 md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]">
        <form onSubmit={generateHistory}>
          <h5 className="theme-text-primary text-sm font-semibold">Set a typical spending range</h5>
          <p className="theme-text-secondary mt-1 text-xs leading-5">
            We’ll generate {SEED_COUNT} synthetic PAYMENT transactions to initialize the model’s 24-transaction history.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="theme-text-secondary text-xs font-medium">
              Minimum (IDR)
              <input
                type="number"
                min="0"
                max={MAX_SEED_SPEND}
                step="1000"
                value={minimumSpend}
                onChange={(event) => setMinimumSpend(event.target.value)}
                disabled={isLoading}
                className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              />
            </label>
            <label className="theme-text-secondary text-xs font-medium">
              Maximum (IDR)
              <input
                type="number"
                min="0"
                max={MAX_SEED_SPEND}
                step="1000"
                value={maximumSpend}
                onChange={(event) => setMaximumSpend(event.target.value)}
                disabled={isLoading}
                className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="theme-border theme-surface-chip theme-text-secondary mt-4 min-h-10 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors hover:border-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {history.length ? 'Regenerate synthetic history' : 'Generate synthetic history'}
          </button>
          <p className="theme-muted mt-3 text-xs leading-5">
            Synthetic starting balance: {formatIdr(startingBalance)}. No account is created.
          </p>
        </form>

        <div
          aria-live="polite"
          className="theme-border theme-surface-inset flex min-h-48 flex-col justify-center rounded-xl border p-4"
        >
          {history.length === 0 ? (
            <>
              <p className="theme-text-primary text-sm font-semibold">No history generated yet</p>
              <p className="theme-text-secondary mt-2 text-sm leading-6">
                The model uses up to 24 previous transactions, so generate a synthetic history before scoring.
              </p>
            </>
          ) : (
            <>
              <p className="theme-text-primary text-sm font-semibold">
                {history.length} prior transactions in this session
              </p>
              <p className="theme-text-secondary mt-1 text-xs leading-5">
                Most recent synthetic payments:
              </p>
              <ul className="theme-text-secondary mt-3 space-y-1.5 text-xs">
                {history.slice(-3).reverse().map((entry, index) => (
                  <li key={`${entry.amount}-${index}`} className="flex justify-between gap-4">
                    <span>{entry.transactionType}</span>
                    <span>{formatIdr(entry.amount)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <form
        onSubmit={scoreTransaction}
        className="theme-border theme-surface mt-5 rounded-xl border p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h5 className="theme-text-primary text-sm font-semibold">Score a transaction</h5>
            <p className="theme-text-secondary mt-1 text-xs leading-5">
              The current transaction is added to this session’s history after a successful prediction.
            </p>
          </div>
          <span className="theme-muted font-mono text-[10px] uppercase tracking-[0.12em]">
            History: {history.length} / 24 minimum
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="theme-text-secondary text-xs font-medium">
            Transaction type
            <select
              value={transactionType}
              onChange={(event) => {
                const nextType = event.target.value;
                setTransactionType(nextType);
                setNewBalance(balanceAfterTransaction(nextType, oldBalance, amount));
              }}
              disabled={isLoading}
              className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {TRANSACTION_TYPES.map((type) => (
                <option key={type} value={type}>{type[0] + type.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </label>
          <label className="theme-text-secondary text-xs font-medium">
            Amount (IDR)
            <input
              type="number"
              min="0.01"
              max={MAX_AMOUNT}
              step="0.01"
              required
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                setNewBalance(balanceAfterTransaction(transactionType, oldBalance, event.target.value));
              }}
              disabled={isLoading}
              className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            />
          </label>
          <label className="theme-text-secondary text-xs font-medium">
            Old balance (IDR)
            <input
              type="number"
              min="0"
              max={MAX_BALANCE}
              step="0.01"
              required
              value={oldBalance}
              onChange={(event) => {
                setOldBalance(event.target.value);
                setNewBalance(balanceAfterTransaction(transactionType, event.target.value, amount));
              }}
              disabled={isLoading}
              className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            />
          </label>
          <label className="theme-text-secondary text-xs font-medium">
            New balance (IDR)
            <input
              type="number"
              min="0"
              max={MAX_BALANCE}
              step="0.01"
              required
              value={newBalance}
              onChange={(event) => setNewBalance(event.target.value)}
              disabled={isLoading}
              className="theme-border theme-surface theme-text-primary mt-1.5 min-h-11 w-full rounded-lg border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={history.length < 24 || isLoading}
          className="theme-button mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
              Analyzing transaction…
            </>
          ) : (
            'Analyze transaction'
          )}
        </button>
      </form>

      <div
        aria-live="polite"
        role={error ? 'alert' : 'status'}
        className="theme-border theme-surface mt-5 flex min-h-28 items-center gap-4 rounded-xl border p-4 sm:p-5"
      >
        {result ? (
          <>
            {result.isFraud === 1 ? (
              <ShieldAlert aria-hidden="true" className="shrink-0 text-rose-600" size={25} />
            ) : (
              <ShieldCheck aria-hidden="true" className="shrink-0 text-emerald-700" size={25} />
            )}
            <div>
              <p className="theme-text-primary font-semibold">
                {result.isFraud === 1 ? 'Flagged by the model' : 'Not flagged by the model'}
              </p>
              {typeof result.probability === 'number' && (
                <p className="theme-text-secondary mt-1 text-sm">
                  Fraud probability: {Math.round(result.probability * 100)}%
                  <span className="theme-muted"> · decision threshold {Math.round(FRAUD_THRESHOLD * 100)}%</span>
                </p>
              )}
            </div>
          </>
        ) : error ? (
          <p className="theme-text-secondary text-sm font-medium">{error}</p>
        ) : (
          <p className="theme-muted text-sm">
            Generate history and analyze a transaction to see the model result.
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-3">
          <p className="theme-accent font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            Original app
          </p>
          <p className="theme-text-secondary mt-1 text-sm">
            A look at the transaction form and the original results screen.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <figure className="theme-border theme-surface overflow-hidden rounded-xl border">
            <Image
              src="/projects/bankguard/screenshots/fraud_detect.png"
              alt="BankGuard transaction fraud detection form"
              width={850}
              height={430}
              className="h-auto w-full"
            />
            <figcaption className="theme-text-secondary px-3 py-2 text-xs">
              Transaction entry
            </figcaption>
          </figure>
          <figure className="theme-border theme-surface overflow-hidden rounded-xl border">
            <Image
              src="/projects/bankguard/screenshots/fraud_result.png"
              alt="BankGuard transaction evaluation result screen"
              width={850}
              height={430}
              className="h-auto w-full"
            />
            <figcaption className="theme-text-secondary px-3 py-2 text-xs">
              Original evaluation view
            </figcaption>
          </figure>
        </div>
      </div>

      <p className="theme-muted mt-4 text-xs leading-5">
        Demo only: this model output is not financial advice or a bank decision. Use synthetic values only. History is kept in this page session and sent to the model service for scoring; it is not saved to an account.
      </p>
    </section>
  );
}
