export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    typeof globalThis.document === 'undefined'
  ) {
    // Minimal document stub to prevent @iconify/react's module-level
    // document.createElement calls from crashing during static generation.
    const noOp = () => ({} as any);
    (globalThis as any).document = {
      createElement: noOp,
      createTextNode: noOp,
      head: { appendChild: noOp },
      body: { appendChild: noOp },
      querySelector: () => null,
      querySelectorAll: () => [],
    };
  }
}
