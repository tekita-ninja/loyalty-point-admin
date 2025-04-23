'use client'

import { Card } from "@/components/ui/card";
import React from "react";

export default function PageContainer({
  children,
  actions,
  title,
  subtitle,
  withCard
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
  subtitle?: string;
  withCard?: boolean;
}) {
  return (
    <PageWrapper withCard={withCard}>
      <header className="flex flex-col gap-3 md:flex-row justify-between p-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{title}</h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div>
          {actions}
        </div>
      </header>
      <div className="p-2">
        {children}
      </div>
    </PageWrapper>
  )
}

const PageWrapper = ({ withCard, children }: { withCard?: boolean, children: React.ReactNode }) => {
  return (
    <>
      {withCard ? <Card className="overflow-hidden mb-4">{children}</Card> : <div className="mb-4">{children}</div>}
    </>
  )
}
