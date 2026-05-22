import { SearchInput } from '@/components/common/SearchInput';

export default function Dashboard() {
  return (
    <div className="flex p-5">
      <div className="flex flex-col w-150">
        <SearchInput />
        <div className="h-500"></div>
      </div>
    </div>
  );
}
