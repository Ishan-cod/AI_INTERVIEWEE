import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

export function InterviewAccordian() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item1">
          <AccordionTrigger>
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center justify-center">
                  <div className="font-sans text-md font-normal">
                    Frontend Developer
                  </div>
                  <div className="mx-1">•</div>
                  <div className="text-muted-foreground">Google</div>
                </div>
                <div className="flex justify-between w-md">
                  <div>
                    <Badge variant={"destructive"} className="text-md">
                      Failed
                    </Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground">29-12-25</div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex">
              <Button variant={"secondary"} className="mx-1">
                View full result
              </Button>
              <Button variant={"secondary"} className="mx-1">
                View job details
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2 ">
          <AccordionTrigger>
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center justify-center">
                  <div className="font-sans text-md font-normal">SDE</div>
                  <div className="mx-1">•</div>
                  <div className="text-muted-foreground">Google</div>
                </div>
                <div className="flex justify-between w-md">
                  <div>
                    <Badge variant={"secondary"} className="text-md">
                      Passed
                    </Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground">29-12-25</div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex">
              <Button variant={"secondary"} className="mx-1">
                View full result
              </Button>
              <Button variant={"secondary"} className="mx-1">
                View job details
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3">
          <AccordionTrigger>
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center justify-center">
                  <div className="font-sans text-md font-normal">SDE</div>
                  <div className="mx-1">•</div>
                  <div className="text-muted-foreground">Google</div>
                </div>
                <div className="flex justify-between w-md">
                  <div>
                    <Badge variant={"secondary"} className="text-md">
                      Passed
                    </Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground">29-12-25</div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex">
              <Button variant={"secondary"} className="mx-1">
                View full result
              </Button>
              <Button variant={"secondary"} className="mx-1">
                View job details
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4">
          <AccordionTrigger>
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center justify-center">
                  <div className="font-sans text-md font-normal">SDE</div>
                  <div className="mx-1">•</div>
                  <div className="text-muted-foreground">Google</div>
                </div>
                <div className="flex justify-between w-md">
                  <div>
                    <Badge variant={"secondary"} className="text-md">
                      Passed
                    </Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground">29-12-25</div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex">
              <Button variant={"secondary"} className="mx-1">
                View full result
              </Button>
              <Button variant={"secondary"} className="mx-1">
                View job details
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
