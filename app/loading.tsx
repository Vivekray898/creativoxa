export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center py-20"
    >
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-primary" />
    </div>
  );
}
