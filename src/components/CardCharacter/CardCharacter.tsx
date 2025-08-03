import { twMerge } from "tailwind-merge";
import type { Character } from "../../types/CharacterType";
import { NavLink } from "react-router";

type CardCharacterProps = Character;

export default function CardCharacter({
	id,
	image,
	name,
	species,
	status,
	location,
}: CardCharacterProps) {
	return (
		<NavLink
			to={`/personagens/${id}`}
			className={twMerge(
				"border-tertiary-2 border-2 w-77 min-h-120 rounded-lg overflow-hidden text-center",
				"hover:scale-105 transition hover:bg-secondary/20"
			)}
		>
			<img src={image} alt={name} className="w-full max-h-76 object-cover" />

			<h2 className="text-xl font-semibold mt-4">{name}</h2>
			<p>{species}</p>
			<p className="text-tertiary-3 font-bold my-4">
				Status:
				<span
					className={twMerge(
						status === "Alive" && "text-green-500",
						status === "Dead" && "text-red-500",
						"ml-1"
					)}
				>
					{status}
				</span>
			</p>
			<div className="border border-tertiary-2 m-4 p-4 rounded-lg text-left">
				<p className="text-tertiary-3 font-bold">Última localização:</p>
				<p>{location.name}</p>
			</div>
		</NavLink>
	);
}
