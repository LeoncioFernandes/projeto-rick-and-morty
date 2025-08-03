import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

interface NavbarMenuProps {
	urlTo: string;
	label: string;
}

export default function NavbarMenu({ urlTo, label }: NavbarMenuProps) {
	return (
		<NavLink to={urlTo}>
			{({ isActive }) => (
				<span
					className={twMerge(
						"text-primary transition duration-100 p-2",
						"hover:bg-secondary/10 rounded-lg",
						isActive && "text-secondary font-semibold"
					)}
				>
					{label}
				</span>
			)}
		</NavLink>
	);
}
