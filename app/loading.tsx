export default function Loading() {
  return (
    <div
      className="grid min-h-[70vh] place-items-center bg-[#f8f5ef] pt-24"
      role="status"
    >
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-2 border-[#123f36]/20 border-t-[#123f36]" />
        <p className="mt-4 text-sm font-bold text-[#123f36]">
          Preparing your page…
        </p>
      </div>
    </div>
  );
}
