
import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#080D18] px-5 py-16 text-center text-white">
      <div className="max-w-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-cyan-400">
          <SearchX size={32} />
        </div>

        <p className="mt-8 text-sm font-semibold tracking-widest text-cyan-400">ERROR 404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-400">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
