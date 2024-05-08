import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Category {
    id: number;
    name: string;
    // add other properties if needed
}
interface CategoryDropdownMenuProps {
    categories: Category[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
    selectedCategories: number[]; // Add the missing property
    setSelectedCategories: (categories: any) => void; // Add the missing property
}

function CategoryDropdownMenu({
    categories,
    selectedCategories,
    setSelectedCategories
}: CategoryDropdownMenuProps) {
    // Helper function to toggle category selection
    // Updated function to handle number type
    const toggleCategory = (categoryId: number) => {
        setSelectedCategories((prevSelected: any) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id: number) => id !== categoryId);
            }
            return [...prevSelected, categoryId];
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map(category => (
                    <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                    >
                        {category.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CategoryDropdownMenu