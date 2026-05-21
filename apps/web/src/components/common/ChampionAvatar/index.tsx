import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/twmerge';

interface ChampionAvatarProps {
  name: string;
  imageUrl: string;
  className?: string;
}

export function ChampionAvatar({
  className,
  imageUrl,
  name,
}: ChampionAvatarProps) {
  return (
    <Avatar className={cn('', className)}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
