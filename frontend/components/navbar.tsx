import Link from "next/link";
import { Anchor } from "lucide-react";
export const NAVLINKS =[
    {
        title: "DashBoard",
        href: "/Dashboard",
    },
    {
        title: "Accouting",
        href: "/Accounting",

    },
    {
        title: "Inventory",
        href: "/Inventory",
    },
    {
        title: "Profile",
        href: "/Profile",
    },
];
export function Navbar() {
    return (
      <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
        <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
          <div className="flex items-center gap-5">
            
            <div className="flex items-center gap-6">
              <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
                   <NavMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  export function NavMenu() {
    return (
        <>
            {NAVLINKS.map((item) => (
                <Link key={item.title + item.href} href={item.href} className = "flex items-centre gap-1 dark:text-stone-300/85 text-stone-800">
                    {item.title}
                </Link>
            ))}
        </>
    );
}