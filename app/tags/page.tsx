import { columns, Tag } from "./(table)/columns";
import { DataTable } from "./(table)/data-table";
import { getTags } from "./actions";

async function getData(): Promise<Tag[]> {
  const { success, data, error } = await getTags();

  if (success) {
    return data;
  }

  console.log(error);

  return [];
}

export default async function TagsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
