"use client";

import React from "react"

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const regions = [
  "Africa",
  "Arab States",
  "Asia Pacific",
  "Europe & CIS",
  "Latin America & Caribbean",
];

export default function EditCountryPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    region: "",
    description: "",
    overview: "",
    key_results: ["", "", ""],
    focus_areas: ["", "", ""],
    featured: false,
  });

  useEffect(() => {
    const fetchCountry = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching country:", error);
        router.push("/setup/countries");
        return;
      }

      if (data) {
        const keyResults = data.key_results || [];
        const focusAreas = data.focus_areas || [];

        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          region: data.region || "",
          description: data.description || "",
          overview: data.overview || "",
          key_results: [
            keyResults[0] || "",
            keyResults[1] || "",
            keyResults[2] || "",
          ],
          focus_areas: [
            focusAreas[0] || "",
            focusAreas[1] || "",
            focusAreas[2] || "",
          ],
          featured: data.featured || false,
        });
      }
      setFetching(false);
    };

    fetchCountry();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("countries")
      .update({
        name: formData.name,
        slug: formData.slug,
        region: formData.region,
        description: formData.description,
        overview: formData.overview,
        key_results: formData.key_results.filter((r) => r.trim() !== ""),
        focus_areas: formData.focus_areas.filter((a) => a.trim() !== ""),
        featured: formData.featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    setLoading(false);

    if (error) {
      console.error("Error updating country:", error);
      alert("Error updating country. Please try again.");
    } else {
      router.push("/setup/countries");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/setup/countries">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Country</h1>
          <p className="mt-1 text-muted-foreground">Update {formData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Edit the country name and region
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Country Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData({ ...formData, region: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
              <Label htmlFor="featured">Featured on homepage</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>
              Describe the UNEDF programs in this country
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overview">Full Overview</Label>
              <Textarea
                id="overview"
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Results</CardTitle>
            <CardDescription>
              Highlight key achievements (up to 3)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.key_results.map((result, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`result-${index}`}>Result {index + 1}</Label>
                <Input
                  id={`result-${index}`}
                  value={result}
                  onChange={(e) => {
                    const newResults = [...formData.key_results];
                    newResults[index] = e.target.value;
                    setFormData({ ...formData, key_results: newResults });
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
            <CardDescription>Main areas of work (up to 3)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.focus_areas.map((area, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`area-${index}`}>Focus Area {index + 1}</Label>
                <Input
                  id={`area-${index}`}
                  value={area}
                  onChange={(e) => {
                    const newAreas = [...formData.focus_areas];
                    newAreas[index] = e.target.value;
                    setFormData({ ...formData, focus_areas: newAreas });
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/setup/countries">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
