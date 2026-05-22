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
import { cn } from '@/lib/twmerge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChampionAvatar } from '../ChampionAvatar';

export function SearchInput() {
  const { data: champions = [], isLoading, isError, error } = useChampions();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Command
      className={cn(
        `relative h-auto overflow-visible`,
        open && ' rounded-b-none',
      )}
    >
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
        <CommandList
          onMouseDown={(event) => event.preventDefault()}
          className="absolute top-full left-0 right-0 z-50 bg-popover rounded-b-2xl"
        >
          <CommandEmpty>
            {isLoading && (
              <div className="flex justify-center items-center">
                <Spinner className="size-6" />
              </div>
            )}
            {isError && error.message && 'Erro ao carregar campeões'}
          </CommandEmpty>
          <CommandGroup className="**:[[cmdk-group-items]]:grid **:[[cmdk-group-items]]:grid-cols-4 **:[[cmdk-group-items]]:gap-2">
            {champions.map((champion) => (
              <CommandItem
                key={champion.id}
                value={champion.name}
                onSelect={() =>
                  router.push(`/champion/${champion.id.toLowerCase()}`)
                }
                className="text-foreground-muted"
              >
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
