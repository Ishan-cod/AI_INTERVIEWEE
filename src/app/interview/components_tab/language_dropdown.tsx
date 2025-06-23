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
import { ChevronDown, ChevronDownCircle } from "lucide-react";
import { Inter, Roboto, Roboto_Mono } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto_mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export function Language_Changer() {
  const router = useRouter();
  const search_params = useSearchParams();
  const [position, setPosition] = React.useState(search_params.get("lang"));

  const update_url = (newLang: string) => {
    const newURL = new URL(window.location.href);
    newURL.searchParams.set("lang", newLang);
    router.replace(newURL.toString());
  };

  const handleChange = (val: string) => {
    setPosition(val); // Update state
    update_url(val); // Update URL using new value
  };

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
