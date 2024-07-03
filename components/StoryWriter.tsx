"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

const StoryWriter = () => {
  const [story, setStory] = useState<string>("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState("");
  const [runStarted, setRunStarted] = useState<boolean>(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState("");
  
 const storiesPath = "public/stories"

  async function runScript(){
    setRunStarted(true);
    setRunFinished(false);
    const response = await fetch('/api/run-script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ story, pages, path: storiesPath })
    });

    if (response.ok && response.body){
        // Handle streams from the API
        console.log("Streaming Started")
    } else {
        setRunFinished(true);
        setRunStarted(false);
        console.error("Failed to start streaming");
    }
  }

  return (
    <div className="flex flex-col container">
        <section className="flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2">
            <Textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="flex-1 text-black"
                placeholder="Write a story about a robot and a human who became friends..."
            />
            <Select onValueChange={(value) => setPages(parseInt(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="How many pages should the story be?"/>
                </SelectTrigger>
                <SelectContent className="w-full">
                    {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                            {i + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button disabled={!story || !pages || runStarted} className="w-full" size="lg"
                onClick={runScript}
            >
                Generate Story
            </Button>
        </section>
        <section className="flex-1 pb-5 mt-5">
            <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
                <div>
                    {runFinished === null && (
                        <>
                            <p className="animate-pulse mr-5">I am waiting for you to Generate a story above...</p>
                            <br/>
                        </>
                    )}
                    <span className="mr-5">{">>"}</span>
                    {progress}
                </div>
                {currentTool && (
                    <div className="py-10">
                        <span className="mr-5">
                            {"--- [Current Tool] ---"}
                        </span>
                        {currentTool}
                    </div>
                )}
                {runStarted && (
                    <div>
                        <span className="mr-5 animate-in">
                            {"--- [AI Storyteller Has Started] ---"}
                        </span>
                        <br/>
                    </div>
                )}
            </div>
        </section>
    </div>
  )
}

export default StoryWriter