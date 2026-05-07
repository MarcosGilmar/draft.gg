import { logoutAction } from '@/actions/logoutAction';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <form action={logoutAction}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
