"use client";

import { useEffect, useState } from "react";
import { convertToDarkMode } from "@/lib/convertToDarkMode";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import tinycolor from "tinycolor2";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

export default function DarkPage() {
  const { toast } = useToast();
  const [inputCss, setInputCss] = useState("");
  const [outputCss, setOutputCss] = useState("");
  const [output, setOutput] = useState(false);
  const [darkness, setDarkness] = useState(70); // Slider value for darkness
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      const darkModeCss = convertToDarkMode(inputCss, darkness);
      setOutputCss(darkModeCss);
      setOutput(true);
      setError(null);
      setCopySuccess(null); // Reset copy success message
    } catch (error) {
      console.error("Error converting CSS:", error);
      setError("Error converting CSS. Please check your input and try again.");
    }
  };
  useEffect(() => {
    if (inputCss === "") setOutput(false);
  }, [inputCss]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCss);
    // .then(
    //   () => setCopySuccess("CSS copied to clipboard!"),
    //   () => setCopySuccess("Failed to copy CSS.")
    // );
    toast({
      title: "CSS copied to clipboard!",
      // description: "CSS copied to clipboard!",
    });
  };

  const previewColor = tinycolor("#fff").darken(darkness).toString(); // Preview color based on slider

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Vanilla CSS Dark Mode Converter
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paste Your CSS Here</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={15}
              value={inputCss}
              onChange={(e) => setInputCss(e.target.value)}
              placeholder="Paste your CSS here"
              className="min-h-[300px]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dark Mode CSS Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={15}
              value={outputCss}
              readOnly
              placeholder="Converted dark mode CSS will appear here"
              className="min-h-[300px]"
            />

            {output && (
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleCopy}
                  className="w-full bg-green-600"
                  size="lg"
                >
                  Copy Code
                </Button>
              </div>
            )}

            {/* {copySuccess && (
              <Alert className="mt-4">
                <Copy className="h-4 w-4" />
                <AlertTitle>Copied</AlertTitle>
                <AlertDescription>{copySuccess}</AlertDescription>
              </Alert>
              // <div className="mt-2 text-green-600">{copySuccess}</div>
            )} */}
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="darknessSlider" className="text-lg font-medium">
            Darkness:
          </Label>
          <Slider
            id="darknessSlider"
            min={70}
            max={95}
            step={1}
            value={[darkness]}
            onValueChange={(value) => setDarkness(value[0])}
          />
          <span className="text-sm text-muted-foreground">{darkness}%</span>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div
            style={{ backgroundColor: previewColor }}
            className="w-32 h-32 border border-border rounded-md"
          />
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <Button onClick={handleConvert} size="lg">
            Convert to Dark Mode
          </Button>
        </div>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
