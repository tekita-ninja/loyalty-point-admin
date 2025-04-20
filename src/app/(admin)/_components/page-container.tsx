'use client'

export default function PageContainer({
  children,
  actions,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="container py-3">
      <header className="flex">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div>
          {actions}
        </div>
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}
