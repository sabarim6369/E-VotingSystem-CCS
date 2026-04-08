function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex min-h-[160px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
        {text}
      </div>
    </div>
  );
}

export default Loader;
