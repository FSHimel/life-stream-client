import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login/Login";
import Register from "./Register/Register";
import heroImg from "../../assets/heroBG.png";
import authbg from "../../assets/authbg.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div
        className="relative w-full min-h-175 rounded-3xl overflow-hidden shadow-2xl bg-white"
        style={{
          backgroundImage: `url(${authbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sliding Red Panel */}
        <motion.div
          animate={{
            x: window.innerWidth >= 1024 ? (isLogin ? "0%" : "100%") : "0%",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className=" hidden lg:flex absolute top-0 left-0 w-1/2 h-full z-20 items-center justify-center p-12 bg- bg-center "
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        >
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-10 text-center">
            <h2 className="text-5xl font-bold text-black">
              {isLogin ? "Welcome Back!" : "Join LifeStream"}
            </h2>

            <p className="mt-5 text-black">
              {isLogin
                ? "Sign in to continue saving lives."
                : "Create your account and become a hero."}
            </p>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="btn btn-secondary mt-8 rounded-xl text-white"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </motion.div>

        {/* Forms */}
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left */}
          <div className="flex items-center justify-center min-h-175">
            {/* Form */}
            <div className="flex items-center justify-center p-6 md:p-10">
              <div className="w-full ">
                {/* Mobile Toggle */}
                <div className="lg:hidden mb-8 text-center">
                  <h2 className="text-3xl font-bold">
                    {isLogin ? "Welcome Back" : "Join LifeStream"}
                  </h2>

                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="btn btn-secondary mt-5"
                  >
                    {isLogin ? "Create Account" : "Login"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Login />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Register />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Empty */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center min-h-175">
              {/* Form */}
              <div className="flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md lg:max-w-lg ">
                  {/* Mobile Toggle */}
                  <div className="lg:hidden mb-8 text-center">
                    <h2 className="text-3xl font-bold">
                      {isLogin ? "Welcome Back" : "Join LifeStream"}
                    </h2>

                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="btn btn-secondary mt-5"
                    >
                      {isLogin ? "Create Account" : "Login"}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35 }}
                      >
                        <Login />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35 }}
                      >
                        <Register />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
