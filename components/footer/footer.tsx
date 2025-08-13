import dayjs from "dayjs";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center md:justify-between py-2 px-4 text-xs md:text-sm">
      <span>
        Copyright ©2025-{dayjs().year()}{" "}
        <Link
          href="https://github.com/0xJett"
          className="underline"
          target="_blank"
        >
          0xJett
        </Link>
      </span>

      <span>
        Powered by{" "}
        <Link
          target="_blank"
          className="underline"
          href="https://github.com/0xJett/next-mdx-blog-admin"
        >
          Next MDX Blog Admin
        </Link>
      </span>
    </footer>
  );
}
