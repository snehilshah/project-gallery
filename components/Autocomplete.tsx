import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState([]);
  const [contributors, setContributors] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `/api/user?q=${query}&exclude=${contributors.map((contributor) => contributor.user_id).join(',')}`
      );
      const test = await res.json();
      setUserData(test);
    };
    if (query.length >= 3) fetchUsers();
  }, [query, contributors]);

  function filterData(data: any) {
    return data.filter((user: any) => {
      return (
        user.user_name.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  const badgeStyle = (color: string) => {
    return {
      borderColor: `${color}20`,
      backgroundColor: `${color}30`,
      color,
    };
  };
  return (
    <div>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Add collaborators..."
          onChangeCapture={(e) =>
            setQuery((e.target as HTMLInputElement).value)
          }
        />
        <CommandList>
          <CommandGroup heading="Select collaborators">
            {query.length >= 3 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : null}
            {/* <CommandItem disabled>
            <div className="flex w-full justify-between">
              <span className="w-56 text-black">Name</span>
              <span className="w-56 text-gray-400">UserName</span>
              <span className="w-56 text-blue-300">Email</span>
            </div>
          </CommandItem> */}
            {/* <CommandSeparator /> */}
            {filterData(userData).map((user: any) => {
              return (
                <CommandItem
                  key={user.user_id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setUserData([]);
                    setQuery('');
                    setContributors((prev) => [...prev, user]);
                  }}
                  className="cursor-pointer"
                >
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
      <div className="relative mt-3 h-14 overflow-y-auto">
        {contributors.map((contributor, index) => (
          <Badge key={index} className="mr-2">
            {contributor.user_name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Autocomplete;
