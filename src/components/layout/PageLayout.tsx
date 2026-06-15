import React from "react";
import AppFooter from "./AppFooter";
import { DASHBOARD_STYLES } from "../../styles/dashboardStyles";

interface PageLayoutProps {
  children: React.ReactNode;
  withStyles?: boolean;
}

export default function PageLayout({
  children,
  withStyles = true,
}: PageLayoutProps) {
  return (
    <>
      {withStyles && (
        <style dangerouslySetInnerHTML={{ __html: DASHBOARD_STYLES }} />
      )}
      <div className="dark bg-surface text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col">
        <main className="flex-1 px-8 pb-12 pt-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <AppFooter />
      </div>
    </>
  );
}
