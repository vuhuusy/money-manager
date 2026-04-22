import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Input, Button, ProfileImageSelector } from "../components/common";
import {
  validateEmail,
  validatePassword,
  validateFullName,
} from "../utils/validation";
import { toast } from "react-toastify";
import { register } from "../services/authService";
import uploadProfileImage from "../utils/uploadProfileImage";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let profileImageURL = null;

    const newErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setIsLoading(false);
      return;
    }

    try {
      if (profileImage) {
        profileImageURL = await uploadProfileImage(profileImage);
      }

      await register({ fullName, email, password, profileImageUrl: profileImageURL });
      toast.success("Profile created successfully. Check your email to activate your account.");
      navigate("/login");
    } catch (error) {
      const data = error.response?.data;
      const status = error.response?.status;
      if (data?.errors) {
        setErrors((prev) => ({ ...prev, ...data.errors }));
      } else if (status === 409) {
        setErrors((prev) => ({ ...prev, email: data?.message }));
      } else {
        toast.error(data?.message || "An error occurred during signup. Please try again.");
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
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-4">
            Start your journey with us by creating an account.
          </p>
          <form onSubmit={handleSignup} noValidate className="space-y-4">
            <div className="flex justify-center mb-3">
              <ProfileImageSelector
                image={profileImage}
                setImage={setProfileImage}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="Nguyen Van A"
                type="text"
                name="fullName"
                autoComplete="name"
                error={errors.fullName}
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="example@mail.com"
                type="email"
                name="email"
                autoComplete="email"
                error={errors.email}
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="MyP@ssw0rd!"
                type="password"
                name="password"
                autoComplete="new-password"
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full py-2 px-3 text-sm"
            >
              Sign Up
            </Button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors duration-300"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
