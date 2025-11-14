export function isPasswordUpdateRequired(
  createdAt: Date,
  updatedAt: Date,
  expireDays = 30
) {
  const daysSinceUpdate =
    (new Date().getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
  return (
    createdAt.getTime() === updatedAt.getTime() || daysSinceUpdate >= expireDays
  );
}
