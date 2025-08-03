import { NavLink } from "react-router";
import NavbarMenu from "../NavbarMenu/NavbarMenu";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-10 bg-tertiary p-4 shadow-[0px_5px_10px] shadow-black/25">
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				<NavLink to={"/"}>
					<img
						src="/images/Logo-Rick-and-Morty.svg"
						alt="Logo Rick and Morty"
						className="max-w-40 sm:max-w-48 hover:scale-105 hover:drop-shadow-[2px_2px_2px] drop-shadow-black/50 transition"
					/>
				</NavLink>
				<ul className="flex flex-col sm:flex-row justify-end sm:justify-center text-sm sm:text-base gap-4">
					<li>
						<NavbarMenu urlTo="personagens" label="Personagens" />
					</li>
					<li>
						<NavbarMenu urlTo="episodios" label="Episodios" />
					</li>
					<li>
						<NavbarMenu urlTo="localizacoes" label="Localizações" />
					</li>
				</ul>
			</div>
		</nav>
	);
}
