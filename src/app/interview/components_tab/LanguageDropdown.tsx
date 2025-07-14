import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Inter } from "next/font/google";

import { useChangeLanguage } from "@/app/store/useStore_Zustand";

// FONTS IMPORT
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export function LanguageChanger() {
  const [position, setPosition] = React.useState("javascript");
  const { set_language } = useChangeLanguage();

  // Change handler
  const handleChange = (val: string) => {
    setPosition(val); // Update state
    if (val == "javascript") set_language("javascript");
    else if (val == "python")
      set_language("python"); // Update URL using new value
    else if (val == "cpp") set_language("cpp");
    else set_language("java"); // Update URL using new value
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`bg-[#212121] text-white/80 hover:bg-black/10 flex text-xs ${inter.className}`}
        >
          {position}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#131111] text-amber-50 border-0">
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuRadioGroup
          value={position as string}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem value="javascript">
            Javascript
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="python">Python</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cpp">C++</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="java">Java</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
