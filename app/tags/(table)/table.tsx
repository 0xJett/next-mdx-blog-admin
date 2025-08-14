"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Tag, columns } from "./columns";
import { DataTable } from "./data-table";

function TagForm() {
  return <div>tag form</div>;
}

interface TableProps<TData> {
  data: TData[];
}

export default function Table({ data }: TableProps<Tag>) {
  const [editingTag, setEditingTag] = useState<Tag>();

  return (
    <div className="container mx-auto flex flex-col gap-2">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button size="sm" className="w-fit">
              <Plus /> Create Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{!!editingTag ? "Edit" : "Create"} Tag</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" placeholder="slug" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
