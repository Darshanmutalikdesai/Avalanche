import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Loading from "@/components/layout/Common/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./components/layout/Common/QueryProvider";

import NotFound from "./components/pages/Pagenotfound";
import RocketCursor from "./components/layout/Common/RocketCursor"; // 🚀 Cursor
import MegaEventGuidelines from "./components/layout/MegaEventGuidelines";

// Lazy load pages
const LandingPage = lazy(() => import("./components/pages/landing"));
const Home = lazy(() => import("./components/pages/home"));
const LoginPage = lazy(() => import("./components/layout/login")); // ✅ login.jsx with signup & signin
const OTPPage = lazy(() => import("./components/layout/OTP"));     // ✅ OTP page
const Events = lazy(() => import("./components/pages/Events"));
const Developer = lazy(() => import("./components/pages/Developer"));
const User = lazy(() => import("./components/pages/user"));
const Rule = lazy(() => import("./components/pages/rule"));
const PaymentGateway = lazy(() => import("./components/pages/PaymentGateway"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Schedule = lazy(() => import("./components/pages/Schedule"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Landing and Home */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />

        {/* Other Pages */}
        <Route path="/events/*" element={<Events />} />
        <Route path="/developer" element={<Developer />} />
        {<Route path="/user-portal/*" element={<User />} />}
        <Route path="/rulebook/*" element={<Rule />} />
        <Route path="/contact" element={<Contact />} />
        {<Route path="/schedule" element={<Schedule />} />}
        {/*<Route path="/mega-event-guidelines" element={<MegaEventGuidelines />} />*/}



        {/* Fallback / 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </Suspense>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <Router>
            {/* 🚀 Global Rocket Cursor */}
          <RocketCursor />

            {/* Main App Routes */}
          <AppRoutes />
        </Router>
      </QueryProvider>
    </QueryClientProvider>
  );
}

export default App;
