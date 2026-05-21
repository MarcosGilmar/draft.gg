'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Spinner } from '@/components/ui/spinner';
import { useChampions } from '@/hooks/use-champions';
import { useState } from 'react';
import { ChampionAvatar } from '../ChampionAvatar';

export function SearchInput() {
  const { data: champions = [], isLoading, isError, error } = useChampions();

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
          <CommandEmpty>
            {isLoading && (
              <div className="flex justify-center items-center">
                <Spinner className="size-6" />
              </div>
            )}
            {isError && error.message && 'Erro ao carregar campeões'}
          </CommandEmpty>
          <CommandGroup>
            {champions.map((champion) => (
              <CommandItem key={champion.id} value={champion.name}>
                <ChampionAvatar
                  name={champion.name}
                  imageUrl={champion.imageUrl}
                />
                {champion.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
