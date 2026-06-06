import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function PageNotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Page not found | SQL Studio";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-20 text-center px-4">
      <p className="text-[120px] font-medium leading-none tracking-tighter text-foreground">
        404
      </p>

      <div className="w-12 h-px bg-border my-6" />

      <h1 className="text-2xl font-medium text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Button variant="outline" onClick={() => navigate("/")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go back home
      </Button>
    </div>
  );
}

export default PageNotFound;
