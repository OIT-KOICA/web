"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useProductStore from "@/lib/stores/product-store";
import { useRouter } from "next/navigation";
import { Discussion } from "@/lib/type";

export default function DiscussionsTable({ slug }: { slug: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const discussions = useProductStore((state) => state.discussions);
  const { setActiveDiscussion } = useProductStore();

  const totalPages = discussions
    ? Math.ceil(discussions.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDiscussions = discussions?.slice(startIndex, endIndex);
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discussions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDiscussions?.map((discussion: Discussion) => (
              <TableRow key={discussion.id}>
                <TableCell>{discussion.user.name}</TableCell>
                <TableCell>
                  {new Date(discussion.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      discussion.status === "open" ? "default" : "secondary"
                    }
                  >
                    {discussion.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveDiscussion(discussion);
                      router.push(
                        `/dashboard/products/${slug}/discussions/${discussion.id}`
                      );
                    }}
                  >
                    Consulter
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précedent
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}