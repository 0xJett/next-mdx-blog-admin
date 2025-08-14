import { Tag } from "./(table)/columns";
import Table from "./(table)/table";
import { getTags } from "./actions";

async function getData(): Promise<Tag[]> {
  const { success, data } = await getTags();

  if (success) {
    return data;
  }

  return [];
}

export default async function TagsPage() {
  const data = await getData();

  return <Table data={data} />;
}
