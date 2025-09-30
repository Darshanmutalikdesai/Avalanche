import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Loading from "@/components/layout/Common/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./components/layout/Common/QueryProvider";

import NotFound from "./components/pages/Pagenotfound";
import RocketCursor from "./components/layout/Common/RocketCursor"; // 🚀 Cursor import

// 🔊 Import the click sound provider
import ClickSoundProvider from "./components/layout/Common/ClickSoundProvider";

// Lazy load pages
const LandingPage = lazy(() => import("./components/pages/landing"));
const Home = lazy(() => import("./components/pages/home"));
const Auth = lazy(() => import("./components/pages/auth"));
const Events = lazy(() => import("./components/pages/Events"));


function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/events/*" element={<Events />} />
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
          <ClickSoundProvider>
            {/* 🚀 Global Rocket Cursor */}
            <RocketCursor />

            {/* Main App Routes */}
            <AppRoutes />
          </ClickSoundProvider>
        </Router>
      </QueryProvider>
    </QueryClientProvider>
  );
}

export default App;
