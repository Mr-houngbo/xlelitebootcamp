export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Le centrage est géré directement par app/admin/login/page.tsx
  // Ce layout est gardé minimal pour ne pas créer un double wrapper
  return <>{children}</>;
}
