import { Link } from "react-router-dom";

export default function HeaderLink() {
  return (
    <Link to="/" className="font-sourgummy text-2xl dark:text-white">
      BeFit.<span className="text-primary text-green-600">Always</span>
    </Link>
  );
}
