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
import { Inter} from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";


// FONTS IMPORT
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
;

export function LanguageChanger() {
  const router = useRouter();
  const search_params = useSearchParams();
  const [position, setPosition] = React.useState(search_params.get("lang"));

  // URL update on language change
  const update_url = (newLang: string) => {
    const newURL = new URL(window.location.href);
    newURL.searchParams.set("lang", newLang);
    router.replace(newURL.toString());
  };

  // Change handler
  const handleChange = (val: string) => {
    setPosition(val); // Update state
    update_url(val); // Update URL using new value
  };


  // Changing RADIO position on changing the URL
  React.useEffect(() => {
    const params = search_params.get("lang");
    if (!params) {
      setPosition("javascript");
    } else {
      setPosition(params as string);
    }
  }, [search_params]);

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
