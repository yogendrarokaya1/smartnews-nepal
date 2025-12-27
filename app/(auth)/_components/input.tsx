interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-white">{label}</label>

      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/70 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
