import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import {Divider} from '@heroui/react'

function Herocard() {
  return (
    <div>
      <Card className="w-[367px] bg-[#09090B] rounded-[23px] h-[235px] ml-2">
        <CardHeader className="">
          <div className="text-[#ffffff]">Frontend Developer</div>
        </CardHeader>
        <Divider/>
        <CardBody></CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default Herocard;
