// components/ModalSearch.tsx
"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'react-bootstrap-icons';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ModalSearchProps {
    className?: string;
}

const ModalSearch: React.FC<ModalSearchProps> = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsOpen(false); // Close the dialog
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className={`flex justify-center items-center cursor-pointer ${className}`}>
                <Search />
            </DialogTrigger>
            <DialogContent className='w-[90%] rounded-lg'>
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                        Type a command or search for products, blogs, etc.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full flex justify-center items-center mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 pl-10 bg-stone-50 border rounded-md w-full"
                    />
                    <Button type="submit" className="ml-4">
                        Search
                    </Button>
                </form>
                {/* Add your search results or suggestions here */}
            </DialogContent>
        </Dialog>
    );
};

export default ModalSearch;