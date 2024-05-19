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

type params = {
  callback: any;
};

function Autocomplete({ callback }: params) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    callback(query).then((res: any) => {
      console.log(res);
    });
  }, [query, callback]);
  
  
  
  const [data, setData] = useState([]);
  function filterData(data: any) {
    return data.filter((user: any) => {
      return (
        user.username.toLowerCase().includes(query.toLowerCase()) ||
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
              <CommandItem key={user.id}>
                <div className="flex w-full justify-between">
                  <span className="w-56 text-black">{user.name}</span>
                  <span className="w-56 text-gray-400">{user.username}</span>
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
