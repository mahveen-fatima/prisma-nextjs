import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        where: {
            title: {
                endsWith: "post"
            }
        },
        orderBy:{
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            slug: true
        },
        // take: 1,
        // skip: 1

    })
    const postsCount = await prisma.post.count()
    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">Posts ({postsCount})</h1>

            <ul className="border-t border-b gap-4 border-white py-5 leading-8">
            {posts.map((post) => (
                <li key={post.id} className="flex items-center justify-between px-5">
                    <Link href={`/posts/${post.slug}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
            </ul>
        </main>
    )
}