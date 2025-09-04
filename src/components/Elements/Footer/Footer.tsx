export default function Footer() {
  return (
    <footer className="w-full text-gray-300 mt-10">
      <div className="text-xs text-gray-400 text-center justify-center">
        © {new Date().getFullYear()} BeFit.Always | Kacper Pietrzak. Wszelkie
        prawa zastrzeżone.
      </div>
    </footer>
  );
}
