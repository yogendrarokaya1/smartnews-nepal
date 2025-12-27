type Props = {
  text: string;
};

export default function Button({ text }: Props) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
    >
      {text}
    </button>
  );
}
