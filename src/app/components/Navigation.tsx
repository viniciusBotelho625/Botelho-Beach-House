import { Menu, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/90 hover:text-white hover:bg-white/10 gap-2"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-light tracking-wider uppercase">
              Menu
            </span>
          </Button>
          <Separator className="h-5  bg-white/10" />
          <div className="flex items-center gap-6 text-white/80 text-sm font-light">
            <button className="hover:text-white transition-colors">PT</button>
            <span className="text-white/40">|</span>
            <button className="hover:text-white transition-colors">EN</button>
          </div>
        </div>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-light tracking-[0.3em] italic">
          Botelho Beach House
        </h1>

        <div className="flex items-center gap-8">
          <button className="text-white/90 hover:text-white text-sm font-light tracking-wider uppercase transition-colors">
            Contatos
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
