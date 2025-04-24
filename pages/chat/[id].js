import { useRouter } from "next/router";

export default function Chat() {
  const { id } = useRouter().query;
  return null;
}
