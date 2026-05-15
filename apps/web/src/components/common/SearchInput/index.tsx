'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';

export function SearchInput() {
  const [open, setOpen] = useState(false);

  return (
    <Command>
      <CommandInput
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        placeholder="Selecione um campeão"
      />

      {open && (
        <CommandList onMouseDown={(event) => event.preventDefault()}>
          <CommandEmpty>Campeão não encontrado</CommandEmpty>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
