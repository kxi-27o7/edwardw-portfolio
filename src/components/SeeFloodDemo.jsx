'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpFromLine, ImagePlus, LoaderCircle, RotateCcw } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const API_URL = (
  process.env.NEXT_PUBLIC_MODEL_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '')
).replace(/\/+$/, '');

const errorMessages = {
  413: 'That image is too large. Choose one under 10 MB.',
  415: 'That image format is not supported. Use JPG, PNG, or WebP.',
  422: 'The file could not be read as an image. Try another image.',
};

export default function SeeFloodDemo() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!previewUrl) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function chooseFile(file) {
    if (isLoading) return;
    setPrediction('');
    setError('');

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setSelectedFile(null);
      setPreviewUrl('');
      setError('Choose a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setPreviewUrl('');
      setError('That image is too large. Choose one under 10 MB.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function classifyImage(event) {
    event.preventDefault();
    if (!selectedFile || isLoading) return;

    if (!API_URL) {
      setError('The model demo is not configured for this deployment yet.');
      return;
    }

    setIsLoading(true);
    setPrediction('');
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/seeflood/predict`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const detail = typeof result?.detail === 'string' ? result.detail : '';
        throw new Error(errorMessages[response.status] || detail || 'The image could not be classified.');
      }

      if (typeof result?.prediction !== 'string') {
        throw new Error('The model service returned an unexpected response. Please try again.');
      }

      setPrediction(result.prediction);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'The model service is unavailable. Please try again later.'
          : requestError.message || 'The image could not be classified. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetDemo() {
    setSelectedFile(null);
    setPreviewUrl('');
    setPrediction('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <section
      aria-labelledby="seeflood-demo-title"
      className="theme-border theme-surface-inset mt-8 rounded-2xl border p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="theme-accent font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            Interactive model demo
          </p>
          <h4 id="seeflood-demo-title" className="theme-text-primary mt-2 text-lg font-bold">
            Try a flood severity prediction
          </h4>
          <p className="theme-text-secondary mt-2 max-w-2xl text-sm leading-6">
            Choose a flood image to classify it as no flood, light, moderate, or severe.
          </p>
        </div>
        {selectedFile && (
          <button
            type="button"
            onClick={resetDemo}
            disabled={isLoading}
            className="theme-text-secondary theme-hover-accent inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw aria-hidden="true" size={15} />
            Clear image
          </button>
        )}
      </div>

      <form onSubmit={classifyImage} className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(14rem,0.9fr)]">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            className="sr-only"
            tabIndex={-1}
            aria-label="Choose a flood image"
            onChange={(event) => {
              chooseFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              chooseFile(event.dataTransfer.files[0]);
            }}
            disabled={isLoading}
            className="theme-border theme-surface theme-text-secondary flex min-h-44 w-full flex-col items-center justify-center rounded-xl border border-dashed px-5 py-6 text-center transition-colors hover:border-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-wait disabled:opacity-70"
          >
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Selected image preview"
                  width={640}
                  height={360}
                  unoptimized
                  className="h-auto max-h-48 max-w-full rounded-lg object-contain"
                />
                <span className="theme-muted mt-3 max-w-full truncate text-xs">{selectedFile.name}</span>
              </>
            ) : (
              <>
                <ImagePlus aria-hidden="true" className="theme-accent" size={24} />
                <span className="theme-text-primary mt-3 text-sm font-semibold">
                  Drop an image here or browse
                </span>
                <span className="theme-muted mt-1 text-xs">JPG, PNG, or WebP · up to 10 MB</span>
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            className="theme-button mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />
                Analyzing image…
              </>
            ) : (
              <>
                <ArrowUpFromLine aria-hidden="true" size={16} />
                Classify image
              </>
            )}
          </button>
        </div>

        <div
          aria-live="polite"
          role={error ? 'alert' : 'status'}
          className="theme-border theme-surface flex min-h-44 flex-col justify-center rounded-xl border p-5"
        >
          {prediction ? (
            <>
              <p className="theme-muted font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                Model prediction
              </p>
              <p className="theme-accent mt-2 text-3xl font-bold capitalize">{prediction}</p>
            </>
          ) : error ? (
            <>
              <p className="text-sm font-semibold text-rose-700">{error}</p>
            </>
          ) : (
            <>
              <p className="theme-text-primary text-sm font-semibold">Your result will appear here</p>
              <p className="theme-muted mt-2 text-sm leading-6">
                The model uses ordinal severity thresholds; its output is not a calibrated probability.
              </p>
            </>
          )}
        </div>
      </form>

      <p className="theme-muted mt-4 text-xs leading-5">
        Demo only—not an emergency or flood-warning tool. Images are processed by the model service and not retained after the request.
      </p>
    </section>
  );
}
