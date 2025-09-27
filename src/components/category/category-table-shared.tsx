'use client';

import { ColDef } from "ag-grid-community";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import AgGridShared from "../ag-grid/AgGridShared";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function CategoryTableShared() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // View button renderer
  const ViewButtonRenderer = (params: any) => {
    return (
      <Button 
        onClick={() => {
          setSelectedPost(params.data);
          setIsModalOpen(true);
        }} 
        variant="outline" 
        size="sm"
      >
        View
      </Button>
    );
  };

  // Image renderer component
  const ImageRenderer = (params: any) => {
    return (
      <div className="flex justify-center items-center h-full">
        <Image 
          src="https://i.ibb.co.com/XfRQ1Sxs/panjabi.webp" 
          alt="Panjabi" 
          width={60} 
          height={60}
          className="rounded object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMxNi42ODYzIDI4IDE0IDI1LjMxMzcgMTQgMjJDMTQgMTguNjg2MyAxNi42ODYzIDE2IDIwIDE2QzIzLjMxMzcgMTYgMjYgMTguNjg2MyAyNiAyMkMyNiAyNS4zMTM3IDIzLjMxMzcgMjggMjAgMjhaTTIwIDEwQzE3Ljc5MDkgMTAgMTYgMTEuNzkwOSAxNiAxNEMxNiAxNi4yMDkxIDE3Ljc5MDkgMTggMjAgMThDMjIuMjA5MSAxOCAyNCAxNi4yMDkxIDI0IDE0QzI0IDExLjc5MDkgMjIuMjA5MSAxMCAyMCAxMFoiIGZpbGw9IiM5Q0EwQTYiLz4KPC9zdmc+';
          }}
        />
      </div>
    );
  };

  // Column definitions
  const postColumns: ColDef<Post>[] = [
    { 
      field: 'id', 
      headerName: 'CAT ID', 
      width: 80,
      filter: 'agNumberColumnFilter',
      sort: 'asc'
    },
    { 
      colId: 'image',
      headerName: 'Image',
      width: 80,
      cellRenderer: ImageRenderer,
      filter: false,
      sortable: false,
      resizable: false,
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
    },

    { 
      field: 'title', 
      headerName: 'Category Title', 
      flex: 2,
      filter: 'agTextColumnFilter',
      cellStyle: { lineHeight: '1.4' }
    },
    { 
      field: 'body', 
      headerName: 'Slug', 
      flex: 3,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => {
        const text = params.value || '';
        return text.length > 100 ? text.substring(0, 50) + '...' : text;
      },
      cellStyle: { lineHeight: '1.4' }
    },
    { 
      colId: 'actions',
      headerName: 'Actions',
      width: 120,
      cellRenderer: ViewButtonRenderer,
      filter: false,
      sortable: false,
      resizable: false,
      pinned: 'right'
    }
  ];

  if (loading) return (
    <div className="p-4 flex justify-center items-center h-64">
      <div className="text-lg">Loading posts...</div>
    </div>
  );

  if (error) return (
    <div className="p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading data: {error}
      </div>
    </div>
  );

  return (
    <>
      
      
      <AgGridShared<Post>
        gridId="posts-grid"
        columnDefs={postColumns}
        rowData={posts}
        height="600px"
        pagination={true}
        pageSize={5}
      />

      {/* Modal for post details */}
      <Dialog   open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedPost?.title&&selectedPost.title.substring(0, 20)}
              <Badge variant="default">Active</Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <Image 
                  src="https://i.ibb.co.com/XfRQ1Sxs/panjabi.webp" 
                  alt="Panjabi" 
                  width={260} 
                  height={160}
                  className="rounded"
                />
                <div>
                  <h3 className="font-semibold">Detail</h3>
                  <p className="text-sm">{selectedPost.body}</p>
                </div>
              </div>
              
            
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}