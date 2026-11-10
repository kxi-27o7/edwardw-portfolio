'use client';

import { useState } from 'react';
import { LoaderCircle, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react';

const API_URL = (
  process.env.NEXT_PUBLIC_FAKEGUARD_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : '')
).replace(/\/+$/, '');
const MAX_TEXT_LENGTH = 20_000;

export default function FakeGuardDemo() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function classifyText(event) {
    event.preventDefault();
    if (!text.trim() || isLoading) return;

    if (!API_URL) {
      setError('The FakeGuard model service is not configured for this deployment yet.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const detail = typeof payload?.detail === 'string' ? payload.detail : '';
        throw new Error(detail || 'The text could not be classified. Please try again.');
      }

      if (
        !['Fake', 'Real'].includes(payload?.label) ||
        typeof payload?.confidence !== 'number' ||
        !Number.isFinite(payload.confidence) ||
        payload.confidence < 0 ||
        payload.confidence > 1 ||
        typeof payload?.truncated !== 'boolean'
      ) {
        throw new Error('The model service returned an unexpected response. Please try again.');
      }

      setResult(payload);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'The FakeGuard model service is unavailable. Please try again later.'
          : requestError.message || 'The text could not be classified. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetDemo() {
    setText('');
    setResult(null);
    setError('');
  }

  return (
    <section
      aria-labelledby="fakeguard-demo-title"
      className="theme-border theme-surface-inset mt-8 rounded-2xl border p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="theme-accent font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            Interactive model demo
          </p>
          <h4 id="fakeguard-demo-title" className="theme-text-primary mt-2 text-lg font-bold">
            Test a news article
          </h4>
          <p className="theme-text-secondary mt-2 max-w-2xl text-sm leading-6">
            Paste a headline or article text to see how the DistilBERT model classifies it.
          </p>
        </div>
        {text && (
          <button
            type="button"
            onClick={resetDemo}
            disabled={isLoading}
            className="theme-text-secondary theme-hover-accent inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw aria-hidden="true" size={15} />
            Clear text
          </button>
        )}
      </div>

      <form onSubmit={classifyText} className="mt-5">
        <label htmlFor="fakeguard-text" className="theme-text-secondary text-xs font-medium">
          Article text
        </label>
        <textarea
          id="fakeguard-text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setError('');
            setResult(null);
          }}
          maxLength={MAX_TEXT_LENGTH}
          rows={7}
          disabled={isLoading}
          placeholder="Paste a headline or article text here…"
          className="fakeguard-textarea theme-border theme-surface theme-text-primary mt-1.5 min-h-40 w-full resize-y rounded-xl border p-3.5 text-sm leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-wait disabled:opacity-70"
        />
        <div className="theme-muted mt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span>Text is sent to the model service for analysis and is not saved.</span>
          <span>{text.length.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} characters</span>
        </div>
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="theme-button mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
              Classifying text…
            </>
          ) : (
            'Classify article'
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
            {result.label === 'Fake' ? (
              <ShieldAlert aria-hidden="true" className="shrink-0 text-rose-600" size={25} />
            ) : (
              <ShieldCheck aria-hidden="true" className="shrink-0 text-emerald-700" size={25} />
            )}
            <div>
              <p className="theme-text-primary font-semibold">
                Model classification: {result.label}
              </p>
              <p className="theme-text-secondary mt-1 text-sm">
                Confidence: {Math.round(result.confidence * 100)}%
                {result.truncated && ' · Input truncated to the model’s 512-token limit'}
              </p>
              <p className="theme-muted mt-1 text-xs">
                A model prediction is not a fact-check. Verify claims with reliable sources.
              </p>
            </div>
          </>
        ) : error ? (
          <p className="theme-text-secondary text-sm font-medium">{error}</p>
        ) : (
          <p className="theme-muted text-sm">
            Paste article text and classify it to see the model result.
          </p>
        )}
      </div>
    </section>
  );
}
