import { ReactNode, MouseEventHandler } from "react";
import Image from 'next/image';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, href, onClick }: ButtonProps) {
  return (
    <div className="inline-flex justify-center space-x-4">
      <div>
        {onClick ? (
          <button
            onClick={onClick}
            className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
          >
            {children}
            <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
          </button>
        ) : (
          <a
            className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
            href={href || "#"}
          >
            {children}
            <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
          </a>
        )}
      </div>
    </div>
  );
}
