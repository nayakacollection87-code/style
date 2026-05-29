"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Wand2,
  FileText,
  Loader2,
  Download,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ratioOptions = [
  { value: "1:1", label: "1:1 (Square)" },
  { value: "16:9", label: "16:9 (Landscape)" },
  { value: "9:16", label: "9:16 (Portrait)" },
  { value: "4:3", label: "4:3 (Standard)" },
  { value: "3:4", label: "3:4 (Portrait)" },
];

export default function CreatorAIPage() {
  const [activeTab, setActiveTab] = useState("text-to-image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1:1");
  const [quantity, setQuantity] = useState("1");
  const [duration, setDuration] = useState("5");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedContent([]);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock generated images
    const qty = parseInt(quantity) || 1;
    const mockResults = Array(Math.min(qty, 6)).fill(null).map((_, i) => 
      `https://picsum.photos/seed/${Date.now() + i}/400/400`
    );
    
    setGeneratedContent(mockResults);
    setIsGenerating(false);
  };

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#A855F7]/20 to-[#EC4899]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#A855F7]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Nexvora AI</h1>
          </div>
          <p className="text-muted-foreground">
            Buat konten visual menakjubkan dengan kekuatan AI
          </p>
        </div>

        {/* AI Tools Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 bg-muted/30">
            <TabsTrigger value="text-to-image" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <ImageIcon className="w-4 h-4 mr-2" />
              Text to Image
            </TabsTrigger>
            <TabsTrigger value="image-to-video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <Video className="w-4 h-4 mr-2" />
              Image to Video
            </TabsTrigger>
            <TabsTrigger value="image-to-image" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <Wand2 className="w-4 h-4 mr-2" />
              Image to Image
            </TabsTrigger>
            <TabsTrigger value="image-to-prompt" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D4FF] data-[state=active]:to-[#A855F7]">
              <FileText className="w-4 h-4 mr-2" />
              Image to Prompt
            </TabsTrigger>
          </TabsList>

          {/* Text to Image */}
          <TabsContent value="text-to-image">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#00D4FF]" />
                    Text to Image
                  </CardTitle>
                  <CardDescription>Buat gambar dari deskripsi teks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Prompt</Label>
                    <textarea
                      placeholder="Deskripsikan gambar yang ingin Anda buat..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-lg border border-border/50 bg-background/50 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Rasio</Label>
                      <Select value={ratio} onValueChange={setRatio}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih rasio" />
                        </SelectTrigger>
                        <SelectContent>
                          {ratioOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Jumlah (max 6)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="6"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="glow"
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Hasil Generate</CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-muted-foreground">AI sedang membuat gambar...</p>
                    </div>
                  ) : generatedContent.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {generatedContent.map((url, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group aspect-square rounded-xl overflow-hidden bg-muted"
                        >
                          <img
                            src={url}
                            alt={`Generated ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="icon" variant="ghost" className="text-white">
                              <Download className="w-5 h-5" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">Hasil generate akan muncul di sini</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Image to Video */}
          <TabsContent value="image-to-video">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#A855F7]" />
                    Image to Video
                  </CardTitle>
                  <CardDescription>Ubah gambar menjadi video animasi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-[#00D4FF]/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Klik atau drag gambar ke sini</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Rasio</Label>
                      <Select value={ratio} onValueChange={setRatio}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih rasio" />
                        </SelectTrigger>
                        <SelectContent>
                          {ratioOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Durasi (max 10 detik)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button variant="glow" className="w-full" disabled>
                    <Video className="w-4 h-4 mr-2" />
                    Generate Video
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hasil Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-20">
                    <Video className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Upload gambar untuk memulai</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Image to Image */}
          <TabsContent value="image-to-image">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-[#EC4899]" />
                    Image to Image
                  </CardTitle>
                  <CardDescription>Transformasi gambar dengan AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-[#00D4FF]/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Klik atau drag gambar ke sini</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Prompt Transformasi</Label>
                    <textarea
                      placeholder="Deskripsikan transformasi yang diinginkan..."
                      className="w-full h-24 px-4 py-3 rounded-lg border border-border/50 bg-background/50 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rasio Output</Label>
                    <Select value={ratio} onValueChange={setRatio}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih rasio" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratioOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="glow" className="w-full" disabled>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Transform
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hasil Transformasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-20">
                    <Wand2 className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Upload gambar untuk memulai</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Image to Prompt */}
          <TabsContent value="image-to-prompt">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#10B981]" />
                    Image to Prompt
                  </CardTitle>
                  <CardDescription>Dapatkan prompt dari gambar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-[#00D4FF]/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Klik atau drag gambar ke sini</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <Button variant="glow" className="w-full" disabled>
                    <FileText className="w-4 h-4 mr-2" />
                    Analyze Image
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prompt yang Dihasilkan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-20">
                    <FileText className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Upload gambar untuk menganalisis</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
