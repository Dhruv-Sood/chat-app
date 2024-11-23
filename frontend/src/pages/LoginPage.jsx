import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
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
            Connect & Chat
          </h1>
          <p className="text-xl text-base-content/70 mb-8">
            Join thousands of users who trust our platform for seamless communication.
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

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md pt-16">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-base-content/60">Please sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="divider my-6">OR</div>

              <div className="text-center">
                <p className="text-base-content/60">
                  New to our platform?{" "}
                  <Link to="/signup" className="link link-primary font-medium">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
