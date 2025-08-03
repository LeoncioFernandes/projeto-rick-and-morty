import { twMerge } from "tailwind-merge";
import type { Episode } from "../../types/EpisodeType";
import { NavLink } from "react-router";

type CardEpisodeProps = Episode;

export default function CardEpisode({
	id,
	name,
	episode,
	air_date,
}: CardEpisodeProps) {
	return (
		<NavLink
			to={`/episodios/${id}`}
			className={twMerge(
				"flex flex-col gap-4 border border-tertiary-2 w-77 p-3 rounded-lg",
				"hover:scale-105 transition hover:bg-secondary/20"
			)}
		>
			<h3 className="text-xl font-semibold">{name}</h3>
			<p>
				<span className="text-tertiary-3 font-bold mr-1">Episódio:</span>
				{episode}
			</p>
			<p>
				<span className="text-tertiary-3 font-bold mr-1">Data Exibição:</span>
				{air_date}
			</p>
		</NavLink>
	);
}
