import { Suspense, lazy } from "react";
import { Route, Router, Switch } from "wouter";
import "./App.css";

import Loading from "@/components/layout/Common/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./components/layout/Common/QueryProvider";

import NotFound from "./components/pages/Pagenotfound";
import { useHashLocation } from "./hooks/routing";

// ✅ Lazy load pages
const LandingPage = lazy(() => import("./components/pages/landing"));


function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* Landing Page */}
        <Route path="/" component={LandingPage} />
        {/* <Route path="/events" component={EventsPage} /> */}
        
       
        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <QueryProvider>
          <Routes />
        </QueryProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
