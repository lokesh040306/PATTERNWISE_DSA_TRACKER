import { useNavigate } from "react-router-dom";
import { useApp } from "../../app/providers/AppProvider";
import Card from "../../components/ui/Card";

/**
 * User Profile Page
 * - Minimal
 * - Professional
 * - Consistent with Login / Register
 */
const Profile = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // same logout as Navbar
    navigate("/");
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Card className="p-8">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-semibold text-zinc-100">
          Profile
        </h1>

        {/* User info */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-500">Name</span>
            <span className="text-zinc-100">
              {user?.name || "-"}
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-500">Email</span>
            <span className="text-zinc-100">
              {user?.email || "-"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="
              rounded-md
              border
              border-red-500/30
              px-4
              py-2
              text-sm
              font-medium
              text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            Logout
          </button>
        </div>
      </Card>
    </section>
  );
};

export default Profile;
