import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Input, Button } from "../components/common";
import { login } from "../services/authService";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    const newErrors = {
      email: !email.trim() ? "Email is required." : null,
      password: !password.trim() ? "Password is required." : null,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setIsLoading(false);
      return;
    }

    try {
      const { user, token } = await login(email, password);
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 403) {
        toast.error(message || "Account is not active. Please activate your account first.");
      } else {
        setFormError(message || "An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background image with blur effect */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your credentials to log in.
          </p>
          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Email"
              type="email"
              autoComplete="email"
              name="email"
              error={errors.email}
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              error={errors.password}
            />

            {formError && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {formError}
              </p>
            )}
            <Button
              type="submit"
              loading={isLoading}
              className="w-full py-2 px-3 text-sm"
            >
              Log In
            </Button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors duration-300"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
