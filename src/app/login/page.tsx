import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/crm" } = await searchParams;
  return <LoginForm callbackUrl={callbackUrl} />;
}
