import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import AIAnalysis from "./pages/AIAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
