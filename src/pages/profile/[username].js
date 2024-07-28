import Profile from "@/components/Profile";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;

  return <Profile username={username} />;
}
