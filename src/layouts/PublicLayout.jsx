import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100">
      <Outlet />
    </div>
  );
}

export default PublicLayout;