import CategoryTableShared from '@/components/category/category-table-shared'

export default function page() {
  return (
    <div className='px-4'>
        {/* <CategoriesTable/> */}
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <CategoryTableShared/>
    </div>
  )
}
