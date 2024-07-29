import { useRouter } from "next/router";
import "../../app/globals.css";

export default function UserProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  return <div>User profile with name: {username}</div>;
}
