import { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/user?q=${query}`);
      const test = await res.json();
      setData(test);
    };
    if (query.length >= 3) fetchUsers();
  }, [query]);

  function filterData(data: any) {
    return data.filter((user: any) => {
      return (
        user.user_name.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    });
  }
  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Add collaborators..."
        onChangeCapture={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <CommandList>
        <CommandGroup heading="Select collaborators">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem disabled>
            <div className="flex w-full justify-between">
              <span className="w-56 text-black">Name</span>
              <span className="w-56 text-gray-400">UserName</span>
              <span className="w-56 text-blue-300">Email</span>
            </div>
          </CommandItem>
          <CommandSeparator />
          {filterData(data).map((user: any) => {
            return (
              <CommandItem key={user.user_id}>
                <div className="flex w-full justify-between">
                  <span className="w-56 text-black">{user.name}</span>
                  <span className="w-56 text-gray-400">{user.user_name}</span>
                  <span className="w-56 text-blue-300">{user.email}</span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Autocomplete;
