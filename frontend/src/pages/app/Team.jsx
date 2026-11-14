
import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  Mail,
  MoreHorizontal,
  X,
  Crown,
  CheckCircle2,
} from "lucide-react";

const initialMembers = [
  {
    id: 1,
    name: "Saloni Bhosale",
    email: "saloni@example.com",
    role: "Admin",
    status: "Active",
    joined: "Nov 01, 2026",
  },
  {
    id: 2,
    name: "Aarav Patil",
    email: "aarav@example.com",
    role: "Developer",
    status: "Active",
    joined: "Nov 02, 2026",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Reviewer",
    status: "Active",
    joined: "Nov 03, 2026",
  },
  {
    id: 4,
    name: "Rohan Deshmukh",
    email: "rohan@example.com",
    role: "Developer",
    status: "Pending",
    joined: "Nov 07, 2026",
  },
];

const availableRoles = ["Admin", "Developer", "Reviewer", "Viewer"];

function Team() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showInvite, setShowInvite] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Developer",
  });
  const [menuId, setMenuId] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesQuery = `${member.name} ${member.email}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesRole =
        roleFilter === "All" || member.role === roleFilter;

      return matchesQuery && matchesRole;
    });
  }, [members, query, roleFilter]);

  const activeCount = members.filter(
    (member) => member.status === "Active"
  ).length;

  const pendingCount = members.filter(
    (member) => member.status === "Pending"
  ).length;

  const inviteMember = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setNotice("Please enter the member name and email.");
      return;
    }

    const emailExists = members.some(
      (member) => member.email.toLowerCase() === email
    );

    if (emailExists) {
      setNotice("A member with this email already exists.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name,
      email,
      role: form.role,
      status: "Pending",
      joined: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setMembers((current) => [newMember, ...current]);

    setForm({
      name: "",
      email: "",
      role: "Developer",
    });

    setShowInvite(false);
    setNotice("Demo invitation added. No actual email was sent.");
  };

  const updateRole = (id, role) => {
    const member = members.find((item) => item.id === id);

    if (!member || member.role === "Admin") {
      setNotice("The Admin role cannot be changed in this demo.");
      setMenuId(null);
      return;
    }

    setMembers((current) =>
      current.map((item) =>
        item.id === id ? { ...item, role } : item
      )
    );

    setMenuId(null);
    setNotice(`${member.name}'s role updated to ${role}.`);
  };

  const removeMember = (id) => {
    const member = members.find((item) => item.id === id);

    if (!member) return;

    if (member.role === "Admin") {
      setNotice("The Admin account cannot be removed from this demo.");
      setMenuId(null);
      return;
    }

    setMembers((current) =>
      current.filter((item) => item.id !== id)
    );

    setMenuId(null);
    setNotice(`${member.name} was removed from the demo team.`);
  };

  const roleDescription = {
    Admin: "Full workspace access and configuration.",
    Developer: "Can inspect findings and work on remediation.",
    Reviewer: "Can review findings and approve or reject comments.",
    Viewer: "Can view reports and workspace activity.",
  };

  return (
    <div
      className="space-y-6"
      onClick={() => {
        if (menuId !== null) setMenuId(null);
      }}
    >
      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-400">
            WORKSPACE / ACCESS CONTROL
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Team Management
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage workspace members, roles, and access.
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setShowInvite(true);
            setNotice("");
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <UserPlus size={16} />
          Invite member
        </button>
      </div>

      {/* DEMO NOTICE */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Demonstration team data. Invitations, authentication, and role
        permissions are not connected to a backend.
      </div>

      {/* ACTION NOTICE */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-sm text-cyan-200">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="shrink-0 rounded p-1 hover:bg-cyan-500/10"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total members",
            value: members.length,
            icon: Users,
          },
          {
            label: "Active members",
            value: activeCount,
            icon: CheckCircle2,
          },
          {
            label: "Pending invitations",
            value: pendingCount,
            icon: Mail,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5"
            >
              <div className="flex justify-between text-sm text-slate-400">
                <span>{stat.label}</span>
                <Icon size={18} className="text-cyan-300" />
              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* MEMBERS TABLE */}
      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111B2E]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 p-5">
          <div>
            <h2 className="font-semibold text-white">
              Workspace members
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage member roles and invitation status.
            </p>
          </div>

          <span className="text-xs text-slate-500">
            {filteredMembers.length} members shown
          </span>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="grid gap-3 border-b border-slate-700 p-4 md:grid-cols-[1fr_190px]">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-3 text-slate-500"
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
          >
            {["All", ...availableRoles].map((role) => (
              <option key={role} value={role}>
                {role === "All" ? "All roles" : role}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-[#17243A] text-xs uppercase text-slate-400">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined / Invited</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-t border-slate-700 text-slate-300 transition hover:bg-[#17243A]/50"
                >
                  {/* MEMBER DETAILS */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-semibold text-blue-300">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {member.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5">
                      {member.role === "Admin" && (
                        <Crown
                          size={14}
                          className="text-amber-300"
                        />
                      )}

                      {member.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-amber-500/10 text-amber-300"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* JOINED DATE */}
                  <td className="p-4 text-xs text-slate-400">
                    {member.joined}
                  </td>

                  {/* ACTIONS */}
                  <td className="relative p-4">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuId(
                          menuId === member.id ? null : member.id
                        );
                      }}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                      aria-label={`Actions for ${member.name}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {menuId === member.id && (
                      <div
                        onClick={(event) => event.stopPropagation()}
                        className="absolute right-8 top-10 z-30 w-48 rounded-xl border border-slate-600 bg-[#1E293B] p-2 shadow-xl"
                      >
                        <p className="px-2 py-1 text-[11px] uppercase text-slate-500">
                          Change role
                        </p>

                        {availableRoles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            disabled={
                              member.role === "Admin" ||
                              member.role === role
                            }
                            onClick={() =>
                              updateRole(member.id, role)
                            }
                            className="block w-full rounded px-2 py-2 text-left text-xs text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {role}
                            {member.role === role ? " (Current)" : ""}
                          </button>
                        ))}

                        <div className="my-2 border-t border-slate-600" />

                        <button
                          type="button"
                          disabled={member.role === "Admin"}
                          onClick={() => removeMember(member.id)}
                          className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <X size={14} />
                          Remove member
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <p className="p-10 text-center text-sm text-slate-500">
              No team members match your search.
            </p>
          )}
        </div>
      </section>

      {/* ROLE PERMISSIONS */}
      <section className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-cyan-300" size={19} />

          <h2 className="font-semibold text-white">
            Role permissions
          </h2>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(roleDescription).map(
            ([role, description]) => (
              <div
                key={role}
                className="rounded-lg bg-[#17243A] p-4"
              >
                <p className="font-medium text-white">{role}</p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* INVITE MEMBER MODAL */}
      {showInvite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowInvite(false)}
        >
          <form
            onSubmit={inviteMember}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md space-y-4 rounded-2xl border border-slate-700 bg-[#111B2E] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Invite team member
              </h2>

              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                aria-label="Close invitation form"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full name
              </label>

              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Enter full name"
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email address
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="developer@example.com"
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Workspace role
              </label>

              <select
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value })
                }
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option>Developer</option>
                <option>Reviewer</option>
                <option>Viewer</option>
                <option>Admin</option>
              </select>
            </div>

            <p className="text-xs text-amber-300">
              This creates a pending demo member. It does not send an
              invitation email.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Add member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Team;
