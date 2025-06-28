import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";

export default function Send_Button() {
  const [input, set_input] = useState("");
  const handle_submit = () => {};

  return (
    <>
      <Input
        placeholder="Your Response here..."
        className="border-0 bg-[#212121]"
      />
      <Button className="ml-2 hover:bg-[#212121]">
        <Send />
      </Button>
    </>
  );
}
