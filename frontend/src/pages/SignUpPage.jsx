import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", 
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-base-100">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-center gap-16">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="mb-8 inline-flex p-3 rounded-2xl bg-primary/10">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Join Connect & Chat
          </h1>
          <p className="text-xl text-base-content/70 mb-8">
            Create your account and start connecting with people around the world.
          </p>
          <div className="hidden lg:flex gap-8 items-center">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Active Users</div>
                <div className="stat-value text-primary">10K+</div>
              </div>
              <div className="stat">
                <div className="stat-title">Messages</div>
                <div className="stat-value text-secondary">1M+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full max-w-md pt-16">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-base-content/60">Get started with your free account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full pl-12 focus:outline-primary"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email address</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="input input-bordered w-full pl-12 focus:outline-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input input-bordered w-full pl-12 pr-12 focus:outline-primary"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-base-content/40" />
                      ) : (
                        <Eye className="w-5 h-5 text-base-content/40" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center text-sm">
                  <p className="text-base-content/60">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
