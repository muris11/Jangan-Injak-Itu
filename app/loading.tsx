export default function Loading() {
  return (
    <main className="container-game grid min-h-[70svh] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-5 h-3 w-52 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-primary shadow-[0_0_18px_rgba(255,228,77,.45)]" />
        </div>
        <p className="display-font text-primary">Loading jebakan...</p>
        <p className="mt-2 text-sm text-muted">Lantai sedang pura-pura aman.</p>
      </div>
    </main>
  );
}
