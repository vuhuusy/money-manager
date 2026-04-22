import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
    return (
        <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>
            {categories.length === 0 ? (
                <p className="text-gray-500">No categories found. Add a new category to get started.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => onEditCategory(category)}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                        >
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    <img src={category.icon} alt={category.name} className="h-5 w-5" />
                                ) : (
                                    <Layers2 size={24} className="text-violet-500" />
                                )}
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{category.name}</p>
                                    <p className="text-sm font-medium text-gray-400 m-1 capitalize">{category.type?.toLowerCase()}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="text-gray-400 hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
