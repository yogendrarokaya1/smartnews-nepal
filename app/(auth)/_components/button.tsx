export default function Button({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-[#4C7CF3] hover:bg-[#3A68E0] text-white py-3 rounded-xl font-medium transition"
    >
      {text}
    </button>
  );
}
