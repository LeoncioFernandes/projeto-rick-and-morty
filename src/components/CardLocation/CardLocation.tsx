import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router";
import type { Location } from "../../types/LocationType";

type CardLocationProps = Location;

export default function CardLocation({
	id,
	name,
	type,
	dimension,
}: CardLocationProps) {
	return (
		<NavLink
			to={`/localizacoes/${id}`}
			className={twMerge(
				"flex flex-col gap-4 border border-tertiary-2 w-77 p-3 rounded-lg",
				"hover:scale-105 transition hover:bg-secondary/20"
			)}
		>
			<h3 className="text-xl font-semibold">{name}</h3>
			<p>
				<span className="text-tertiary-3 font-bold mr-1">Tipo:</span>
				{type}
			</p>
			<p>
				<span className="text-tertiary-3 font-bold mr-1">Dimensão:</span>
				{dimension ? dimension : "unknown"}
			</p>
		</NavLink>
	);
}
