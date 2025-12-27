type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...props }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
