export function Loading({ dark = false }) {
  return (
    <div className={`state ${dark ? 'dark' : ''}`} role="status" aria-live="polite">
      <span className="mark">GILPIX</span>
    </div>
  );
}

// `dark` is for pages that open on a full-bleed photo, so the white nav stays readable.
export function ApiError({ error, dark = false }) {
  const notFound = error && error.status === 404 && error.api;
  return (
    <div className={`state ${dark ? 'dark' : ''}`} role="alert">
      <div className="max-w-md">
        <h1 className="display d3">{notFound ? "We couldn't find that page." : "The studio server isn't answering."}</h1>
        <p className="lede mx-auto mt-5">
          {notFound
            ? 'The story may have moved. Head back to the stories and pick another.'
            : 'The site loaded, but its API did not respond. If you are the owner, check that the API is deployed and reachable at /api/health.'}
        </p>
      </div>
    </div>
  );
}
